import React, { useEffect } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnnouncements } from "../../store/dispatchers/announcement.dispatch";
import { announcementList } from "../../store/selectors/announcement.selector";
import { loggedInUserSocietyDetails } from "../../store/selectors/authetication.selector";
import { fetchingAnnocements } from "../../store/selectors/announcement.selector";
import { initalPaginator } from "../../modals/constant";
import AnnouncementCard from "../../components/announcementCard/announcementCard";
import { SpinnerLoader } from "../../shared";

const Announcements = () => {
    const dispatch = useDispatch();
    const listOfAnnouncements = useSelector(announcementList);
    const loadingAnnocements = useSelector(fetchingAnnocements);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const fetchAnnouncements = () => {
        const param = {
            ...initalPaginator,
            societyId: societyDetails._id
        };
        dispatch(getAllAnnouncements(param));
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    return (
        <div className="wrapper">
            <DefaultLayout>
                <SpinnerLoader show={loadingAnnocements} fullScreen={true}>
                    {listOfAnnouncements?.docs?.map((announcement, index) => {
                        return (
                            <AnnouncementCard
                                annoucement={announcement}
                                key={index}
                            ></AnnouncementCard>
                        );
                    })}
                </SpinnerLoader>
            </DefaultLayout>
        </div>
    );
};

export default Announcements;
