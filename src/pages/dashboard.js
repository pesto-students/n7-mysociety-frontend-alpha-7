import React from "react";
import DefaultLayout from "../components/layout/defaultLayout";
import ProfileCard from "../components/shared/profileCard/index";

const Dashboard = (props) => {
    return (
        <div className="wrapper">
            <DefaultLayout>
                Dashboard View call here...
                <ProfileCard />
            </DefaultLayout>
        </div>
    );
};

export default Dashboard;
