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
import { Link } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();
    const listOfAnnouncements = useSelector(announcementList);
    const listOfEvents = useSelector(allEvents);
    const listOfComplaints = useSelector(complaintList);
    const listOfUsers = useSelector(userList);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const isAdmin = useSelector(isLoggedInAsAdmin);
    const contents = {
        isAnnocementsLoading: useSelector(fetchingAnnocements),
        loadingEvents: useSelector(isEventLoading),
        isLoadingMember: useSelector(isUserLoading),
        isComplaintsLoading: useSelector(fetchingComplaint)
    };
    const eventParam = {
        limit: 1,
        page: 1,
        societyId: societyDetails?._id
    };
    const complaintParam = {
        limit: 2,
        page: 1,
        societyId: societyDetails?._id,
        status: "Pending"
    };
    const announcementParam = {
        limit: 2,
        page: 1,
        societyId: societyDetails?._id,
        filterType: "latest"
    };

    useEffect(() => {
        if (societyDetails?._id) {
            const param = {
                ...dashboardInitalPaginator,
                societyId: societyDetails?._id
            };

            dispatch(getAllEvents({ ...eventParam, filterType: "upcoming" }));
            dispatch(getAllAnnouncements(announcementParam));
            dispatch(getAllComplaints(complaintParam));
            dispatch(
                getAllUsers({ ...param, getAll: true, isConfirmed: false })
            );
        }
    }, [societyDetails]);

    const getHeaderTitle = (title, count = 0) => {
        return (
            <div className="header-title">
                <Typography variant="h6" color="primary">
                    {title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="primary"
                    className="counts"
                >
                    {count}
                </Typography>
            </div>
        );
    };

    const announcement = (
        <div className="announcement dashboard">
            {getHeaderTitle(
                "Latest Announcements",
                listOfAnnouncements.totalDocs
            )}
            <SpinnerLoader show={contents.isAnnocementsLoading}>
                {listOfAnnouncements?.docs?.length > 0 ? (
                    <div className="list">
                        {listOfAnnouncements?.docs?.map(
                            (announcement, index) => {
                                return (
                                    <AnnouncementCard
                                        annoucement={announcement}
                                        key={index}
                                        isDashboard={true}
                                    ></AnnouncementCard>
                                );
                            }
                        )}
                    </div>
                ) : (
                    <div className="no-record-message">
                        <Typography variant="h6" component="h6" color="primary">
                            No records found
                        </Typography>
                    </div>
                )}
                {listOfAnnouncements?.docs &&
                    listOfAnnouncements?.docs.length >=
                        announcementParam.limit && (
                        <div className="showMore">
                            <Link to="/announcements">Show More</Link>
                        </div>
                    )}
            </SpinnerLoader>
        </div>
    );

    const complaints = (
        <div className="complaint dashboard">
            {getHeaderTitle("Open Complaints", listOfComplaints.totalDocs)}
            <SpinnerLoader show={contents.isComplaintsLoading}>
                {listOfComplaints?.docs?.length > 0 ? (
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
                ) : (
                    <div className="no-record-message">
                        <Typography variant="h6" component="h6" color="primary">
                            No records found
                        </Typography>
                    </div>
                )}
                {listOfComplaints?.docs &&
                    listOfComplaints?.docs.length >= complaintParam.limit && (
                        <div className="showMore">
                            <Link to="/complaints">Show More</Link>
                        </div>
                    )}
            </SpinnerLoader>
        </div>
    );

    const events = (
        <div className="events dashboard">
            <div>
                {getHeaderTitle("Upcoming Events", listOfEvents.totalDocs)}
            </div>
            <SpinnerLoader show={contents.loadingEvents}>
                {listOfEvents?.docs?.length > 0 ? (
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
                ) : (
                    <div className="no-record-message">
                        <Typography variant="h6" component="h6" color="primary">
                            No records found
                        </Typography>
                    </div>
                )}
                {listOfEvents?.docs &&
                    listOfEvents?.docs.length >= eventParam.limit && (
                        <div className="showMore">
                            <Link to="/events">Show More</Link>
                        </div>
                    )}
            </SpinnerLoader>
        </div>
    );

    const newMembers = (
        <div className="newMembers">
            <div>
                {getHeaderTitle("New Member Requests", listOfUsers.totalDocs)}
            </div>
            <SpinnerLoader show={contents.isLoadingMember}>
                {listOfUsers?.docs?.length > 0 ? (
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
                ) : (
                    <div className="no-record-message">
                        <Typography variant="h6" component="h6" color="primary">
                            No records found
                        </Typography>
                    </div>
                )}
                {listOfUsers?.docs &&
                    listOfUsers?.docs.length >=
                        dashboardInitalPaginator.limit && (
                        <div className="showMore">
                            <Link to="/all-members">Show More</Link>
                        </div>
                    )}
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
