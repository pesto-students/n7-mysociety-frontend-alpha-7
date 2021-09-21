import React, { useEffect } from "react";
import DefaultLayout from "../components/layout/defaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnnouncements } from "../store/dispatchers/announcement.dispatch";
import { announcementList } from "../store/selectors/announcement.selector";
import { loggedInUserSocietyDetails } from "../store/selectors/authetication.selector";
import { initalPaginator } from "../modals/constant";
const Dashboard = () => {
    const dispatch = useDispatch();
    const listOfAnnouncements = useSelector(announcementList);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    useEffect(() => {
        const param = {
            ...initalPaginator,
            societyId: societyDetails._id
        };
        dispatch(getAllAnnouncements(param));
    }, []);
    console.log(listOfAnnouncements);
    return (
        <div className="wrapper">
            <DefaultLayout>
                <div className="data-container">
                    <div className="announcement-list"></div>
                </div>
            </DefaultLayout>
        </div>
    );
};

export default Dashboard;
