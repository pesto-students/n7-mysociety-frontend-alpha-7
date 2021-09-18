import React from "react";
import DefaultLayout from "../components/layout/defaultLayout";
import ProfileCard from "../components/shared/profileCard/index";
const Members = () => {
    const content = {
        avatarUrl: "logo512.png",
        userName: "John Smith",
        phone: "888998343",
        email: "john@gmail.com",
        building: "B19"
    };
    const content1 = {
        userName: "Yasmin Austin",
        phone: "888998343",
        email: "john@gmail.com",
        building: "B19"
    };
    return (
        <div className="wrapper">
            <DefaultLayout>
                Members View call here...
                <ProfileCard content={content} />
                <ProfileCard content={content1} />
            </DefaultLayout>
        </div>
    );
};

export default Members;
