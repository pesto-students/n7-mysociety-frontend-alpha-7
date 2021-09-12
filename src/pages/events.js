import React from "react";
import DefaultLayout from "../components/layout/defaultLayout";
import EventCard from "../components/shared/eventCard";

const Events = () => {
    const content = {
        title: "New Year Celebration",
        location: "Society Ground",
        about: "This year we are celebrating a new year event. So be ready and try to attend that memorable event with your family. testt ghjg jh",
        fromDate: new Date("9/12/2021 10:00:PM"),
        toDate: new Date("9/12/2021 11:00:PM")
    };
    return (
        <div className="wrapper">
            <DefaultLayout>
                Events View call here...
                <EventCard content={content} isDashboardView />
            </DefaultLayout>
        </div>
    );
};

export default Events;
