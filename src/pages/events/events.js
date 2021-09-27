import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import EventCard from "../../components/shared/eventCard";
import { Paginator, SpinnerLoader, Tabs, Tab } from "../../shared";
import { useSelector, useDispatch } from "react-redux";
import {
    allEvents,
    pager,
    isEventLoading,
    isDeleting
} from "../../store/selectors/event.selector";
import { loggedInUserSocietyDetails } from "../../store/selectors/authetication.selector";
import { getAllEvents } from "../../store/dispatchers/event.dispatch";
import { initalPaginator } from "../../modals/constant";
import "./events.scss";
const Events = () => {
    const events = useSelector(allEvents);
    const eventPager = useSelector(pager);
    const loading = useSelector(isEventLoading);
    const deleting = useSelector(isDeleting);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const dispatch = useDispatch();
    const [currentTab, setTab] = useState(0);

    const getCurrentFilter = () => {
        if (currentTab === 0) return "todays";
        if (currentTab === 1) return "past";
        if (currentTab === 2) return "upcoming";

        return "todays";
    };

    const fetchEvents = (pageNumber) => {
        const payload = {
            limit: initalPaginator.limit,
            page: pageNumber,
            societyId: societyDetails?._id,
            filterType: getCurrentFilter()
        };
        dispatch(getAllEvents(payload));
    };
    useEffect(() => fetchEvents(1), [currentTab]);

    const handleTabChange = (e, v) => {
        e && e.stopPropagation();
        setTab(v);
    };

    const tabs = (
        <div className="tab-bar">
            <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab index={0} label="Today" />
                <Tab index={1} label="Past" />
                <Tab index={2} label="Upcoming" />
            </Tabs>
        </div>
    );

    const showLoader = loading || deleting;
    return (
        <div className="wrapper">
            <DefaultLayout>
                {tabs}
                <SpinnerLoader show={showLoader} fullScreen={true}>
                    <Paginator
                        pager={eventPager}
                        loading={showLoader}
                        pageChange={(e) => fetchEvents(e)}
                    >
                        <div className="event-list">
                            {events?.docs?.map((event) => {
                                return (
                                    <EventCard
                                        event={event}
                                        isAdmin
                                        key={event._id}
                                        isDashboardView={false}
                                    />
                                );
                            })}
                        </div>
                    </Paginator>
                </SpinnerLoader>
            </DefaultLayout>
        </div>
    );
};

export default Events;
