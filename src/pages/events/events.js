import React from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import EventCard from "../../components/shared/eventCard";
import { Paginator, SpinnerLoader } from "../../shared";
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
    const fetchEvents = (pageNumber) => {
        const payload = {
            limit: initalPaginator.limit,
            page: pageNumber,
            societyId: societyDetails._id
        };
        dispatch(getAllEvents(payload));
    };

    const showLoader = loading || deleting;
    return (
        <div className="wrapper">
            <DefaultLayout>
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
