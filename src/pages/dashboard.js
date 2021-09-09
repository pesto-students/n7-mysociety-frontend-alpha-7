import React from "react";
import DefaultLayout from "../components/layout/defaultLayout";

const Dashboard = (props) => {
    return (
        <div className="wrapper">
            <DefaultLayout pageTitle="Dashboard" noPadding={true}>
                Dashboard View call here...
            </DefaultLayout>
        </div>
    );
};

export default Dashboard;
