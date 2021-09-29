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
    const [tabCount, setTabCount] = useState(0);

    useEffect(() => {
        setTabCount(events.totalDocs);
    }, [events]);

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
    console.log(societyDetails);
    useEffect(() => {
        if (societyDetails?._id) {
            fetchEvents(1);
        }
    }, [societyDetails, currentTab]);

    const handleTabChange = (e, v) => {
        e && e.stopPropagation();
        setTab(v);
        setTabCount(0);
    };
    const Counts = () => {
        return <div className="count">{tabCount > 9 ? `9+` : tabCount}</div>;
    };
    const tabs = (
        <div className="tab-bar">
            <Tabs
                value={currentTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab
                    index={0}
                    label="Today"
                    icon={currentTab === 0 ? <Counts /> : ""}
                />
                <Tab
                    index={1}
                    label="Past"
                    icon={currentTab === 1 ? <Counts /> : ""}
                />
                <Tab
                    index={2}
                    label="Upcoming"
                    icon={currentTab === 2 ? <Counts /> : ""}
                />
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
