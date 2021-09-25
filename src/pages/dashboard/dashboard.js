import React, { useEffect } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnnouncements } from "../../store/dispatchers/announcement.dispatch";
import { getAllComplaints } from "../../store/dispatchers/complaint.dispatch";
import { announcementList } from "../../store/selectors/announcement.selector";
import {
    allEvents,
    isEventLoading
} from "../../store/selectors/event.selector";
import { complaintList } from "../../store/selectors/complaint.selector";
import { loggedInUserSocietyDetails } from "../../store/selectors/authetication.selector";
import { fetchingAnnocements } from "../../store/selectors/announcement.selector";
import { fetchingComplaint } from "../../store/selectors/complaint.selector";
import { dashboardInitalPaginator } from "../../modals/constant";
import AnnouncementCard from "../../components/announcementCard/announcementCard";
import { isLoggedInAsAdmin } from "../../store/selectors/authetication.selector";
import "./dashboard.scss";
import { SpinnerLoader, Typography } from "../../shared";
import ComplainCard from "../../components/complainCard/complainCard";
import { getAllEvents } from "../../store/dispatchers/event.dispatch";
import EventCard from "../../components/shared/eventCard";

const Dashboard = () => {
    const dispatch = useDispatch();
    const listOfAnnouncements = useSelector(announcementList);
    const listOfEvents = useSelector(allEvents);
    const listOfComplaints = useSelector(complaintList);

    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const isAdmin = useSelector(isLoggedInAsAdmin);
    const contents = {
        isAnnocementsLoading: useSelector(fetchingAnnocements),
        loadingEvents: useSelector(isEventLoading),
        isComplaintsLoading: useSelector(fetchingComplaint)
    };
    useEffect(() => {
        const param = {
            ...dashboardInitalPaginator,
            societyId: societyDetails?._id
        };
        dispatch(getAllEvents({ ...param, filterType: "todays" }));
        dispatch(getAllAnnouncements({ ...param, filterType: "latest" }));
        dispatch(getAllAnnouncements(param));
        dispatch(getAllComplaints(param));
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

    const complaints = (
        <div className="complaint">
            {getHeaderTitle("Open Complaints")}
            <SpinnerLoader show={contents.isComplaintsLoading}>
                <div className="list">
                    {listOfComplaints?.docs?.map((complaint, index) => {
                        return (
                            <ComplainCard
                                complaint={complaint}
                                key={index}
                                isDashboard={true}
                            ></ComplainCard>
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

    const newMembers = (
        <div className="newMembers">
            <div>{getHeaderTitle("New members joins the society")}</div>
        </div>
    );

    return (
        <div className="wrapper">
            <DefaultLayout>
                {isAdmin ? (
                    <div className="data-container">
                        <div className="firstRow">
                            {newMembers}
                            {complaints}
                            {memories}
                        </div>
                    </div>
                ) : (
                    <div className="data-container">
                        <div className="firstRow">
                            {annocements}
                            {events}
                            {memories}
                        </div>
                        <div className="secondRow"> {complaints}</div>
                    </div>
                )}
            </DefaultLayout>
        </div>
    );
};

export default Dashboard;
