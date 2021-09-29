import React, { useEffect } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnnouncements } from "../../store/dispatchers/announcement.dispatch";
import { getAllComplaints } from "../../store/dispatchers/complaint.dispatch";
import { getAllUsers } from "../../store/dispatchers/user.dispatch";
import { announcementList } from "../../store/selectors/announcement.selector";
import {
    allEvents,
    isEventLoading
} from "../../store/selectors/event.selector";
import { userList, isUserLoading } from "../../store/selectors/user.selector";
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
import ProfileCard from "../../components/shared/profileCard/index";

const Dashboard = () => {
    const dispatch = useDispatch();
    const listOfAnnouncements = useSelector(announcementList);
    const listOfEvents = useSelector(allEvents);
    const listOfComplaints = useSelector(complaintList);
    const listOfUsers = useSelector(userList);
    console.log(listOfUsers, "listOfUsers---");
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const isAdmin = useSelector(isLoggedInAsAdmin);
    const contents = {
        isAnnocementsLoading: useSelector(fetchingAnnocements),
        loadingEvents: useSelector(isEventLoading),
        isLoadingMember: useSelector(isUserLoading),
        isComplaintsLoading: useSelector(fetchingComplaint)
    };
    useEffect(() => {
        if (societyDetails?._id) {
            const param = {
                ...dashboardInitalPaginator,
                societyId: societyDetails?._id
            };
            dispatch(getAllEvents({ ...param, filterType: "upcoming" }));
            dispatch(getAllAnnouncements({ ...param, filterType: "latest" }));
            dispatch(getAllAnnouncements(param));
            dispatch(getAllComplaints(param));
            dispatch(
                getAllUsers({ ...param, getAll: true, isConfirmed: false })
            );
        }
    }, [societyDetails]);

    const getHeaderTitle = (title) => {
        return (
            <div className="header-title">
                <Typography variant="h6" color="primary">
                    {title}
                </Typography>
            </div>
        );
    };

    const announcement = (
        <div className="announcement dashboard">
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
        <div className="complaint dashboard">
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
        <div className="events dashboard">
            <div>{getHeaderTitle("Upcoming Events")}</div>
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

    const newMembers = (
        <div className="newMembers">
            <div>{getHeaderTitle("New members joins the society")}</div>
            <SpinnerLoader show={contents.isLoadingMember}>
                <div className="list">
                    {listOfUsers?.docs?.map((member, index) => {
                        return (
                            <ProfileCard
                                content={member}
                                key={index}
                                isDashboardView={true}
                            ></ProfileCard>
                        );
                    })}
                </div>
            </SpinnerLoader>
        </div>
    );

    return (
        <div className="wrapper">
            <DefaultLayout>
                <div className="data-container dashboard">
                    <div className="firstRow">
                        {isAdmin && newMembers}
                        {!isAdmin && announcement}
                        {complaints}
                        {events}
                    </div>
                </div>
            </DefaultLayout>
        </div>
    );
};

export default Dashboard;
