import React, { useEffect } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnnouncements } from "../../store/dispatchers/announcement.dispatch";
import { announcementList } from "../../store/selectors/announcement.selector";
import { loggedInUserSocietyDetails } from "../../store/selectors/authetication.selector";
import { fetchingAnnocements } from "../../store/selectors/announcement.selector";
import { initalPaginator } from "../../modals/constant";
import AnnouncementCard from "../../components/announcementCard/announcementCard";
import "./dashboard.scss";
import { SpinnerLoader, Typography } from "../../shared";
const Dashboard = () => {
    const dispatch = useDispatch();
    const listOfAnnouncements = useSelector(announcementList);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const contents = {
        isAnnocementsLoading: useSelector(fetchingAnnocements)
    };
    useEffect(() => {
        const param = {
            ...initalPaginator,
            societyId: societyDetails._id
        };
        dispatch(getAllAnnouncements(param));
    }, []);

    const getHeaderTitle = (title) => {
        return (
            <div className="header-title">
                <Typography variant="h6" color="primary">
                    {title}
                </Typography>
            </div>
        );
    };

    const annocements = (
        <div className="announcement">
            {getHeaderTitle("Latest Announcements")}
            <SpinnerLoader show={contents.isAnnocementsLoading}>
                <div className="list">
                    {listOfAnnouncements?.docs?.map((announcement, index) => {
                        return (
                            <AnnouncementCard
                                annoucement={announcement}
                                key={index}
                            ></AnnouncementCard>
                        );
                    })}
                </div>
            </SpinnerLoader>
        </div>
    );

    const events = (
        <div className="events">
            <div>{getHeaderTitle("Todays Events")}</div>
        </div>
    );

    const memories = (
        <div className="memories">
            <div>{getHeaderTitle("Some Latest Memories")}</div>
        </div>
    );

    return (
        <div className="wrapper">
            <DefaultLayout>
                <div className="data-container">
                    {annocements}
                    {events}
                    {memories}
                </div>
            </DefaultLayout>
        </div>
    );
};

export default Dashboard;
