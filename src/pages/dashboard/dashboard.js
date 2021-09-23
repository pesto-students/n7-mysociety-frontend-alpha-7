import React, { useEffect } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnnouncements } from "../../store/dispatchers/announcement.dispatch";
import { announcementList } from "../../store/selectors/announcement.selector";
import {
    allEvents,
    isEventLoading
} from "../../store/selectors/event.selector";
import { loggedInUserSocietyDetails } from "../../store/selectors/authetication.selector";
import { fetchingAnnocements } from "../../store/selectors/announcement.selector";
import { initalPaginator } from "../../modals/constant";
import AnnouncementCard from "../../components/announcementCard/announcementCard";
import "./dashboard.scss";
import { SpinnerLoader, Typography } from "../../shared";
import { getAllEvents } from "../../store/dispatchers/event.dispatch";
import EventCard from "../../components/shared/eventCard";
const Dashboard = () => {
    const dispatch = useDispatch();
    const listOfAnnouncements = useSelector(announcementList);
    const listOfEvents = useSelector(allEvents);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const contents = {
        isAnnocementsLoading: useSelector(fetchingAnnocements),
        loadingEvents: useSelector(isEventLoading)
    };
    useEffect(() => {
        const param = {
            ...initalPaginator,
            societyId: societyDetails._id
        };
        dispatch(getAllEvents({ ...param, filterType: "todays" }));
        dispatch(getAllAnnouncements({ ...param, filterType: "latest" }));
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
                                isDashboard={true}
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
            <SpinnerLoader show={contents.loadingEvents}>
                <div className="list">
                    {listOfEvents?.docs?.map((event, index) => {
                        return (
                            <EventCard
                                event={event}
                                key={index}
                                isDashboardView={true}
                            ></EventCard>
                        );
                    })}
                </div>
            </SpinnerLoader>
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
