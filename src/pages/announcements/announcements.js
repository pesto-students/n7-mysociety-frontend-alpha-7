import React from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnnouncements } from "../../store/dispatchers/announcement.dispatch";
import { announcementList } from "../../store/selectors/announcement.selector";
import { loggedInUserSocietyDetails } from "../../store/selectors/authetication.selector";
import { fetchingAnnocements } from "../../store/selectors/announcement.selector";
import AnnouncementCard from "../../components/announcementCard/announcementCard";
import { SpinnerLoader, Paginator } from "../../shared";

const Announcements = () => {
    const dispatch = useDispatch();
    const listOfAnnouncements = useSelector(announcementList);
    const loadingAnnocements = useSelector(fetchingAnnocements);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const fetchAnnouncements = (param) => {
        console.log(param);
        const payload = {
            ...param,
            societyId: societyDetails._id
        };
        dispatch(getAllAnnouncements(payload));
    };

    return (
        <div className="wrapper">
            <DefaultLayout>
                <SpinnerLoader show={loadingAnnocements} fullScreen={true}>
                    <Paginator pageChange={fetchAnnouncements}>
                        {listOfAnnouncements?.docs?.map(
                            (announcement, index) => {
                                return (
                                    <AnnouncementCard
                                        annoucement={announcement}
                                        key={index}
                                    ></AnnouncementCard>
                                );
                            }
                        )}
                    </Paginator>
                </SpinnerLoader>
            </DefaultLayout>
        </div>
    );
};

export default Announcements;
