import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { ComplainCard } from "../../components";
import { SpinnerLoader } from "../../shared";
import "./complaints.scss";
const Complaints = () => {
    const [isLoading, setLoading] = useState(true);

    const dummyComplains = [
        {
            _id: "1",
            name: "CC TV Camera Not working",
            postedOn: "10-08-2021",
            updatedOn: "10-08-2021",
            description:
                "I request you to kindly take the needful action and get the cameras repaired at the earliest. I am ready to pay all applicable charges (if applicable) for the above-requested service",
            postedBy: "Admin",
            updatedBy: "Admin",
            priorityLevel: "High"
        },
        {
            _id: "1",
            name: "CC TV Camera Not working",
            postedOn: "10-08-2021",
            updatedOn: "10-08-2021",
            description:
                "I request you to kindly take the needful action and get the cameras repaired at the earliest. I am ready to pay all applicable charges (if applicable) for the above-requested service",
            postedBy: "Admin",
            updatedBy: "Admin",
            priorityLevel: "High"
        },
        {
            _id: "1",
            name: "CC TV Camera Not working",
            postedOn: "10-08-2021",
            updatedOn: "10-08-2021",
            description:
                "I request you to kindly take the needful action and get the cameras repaired at the earliest. I am ready to pay all applicable charges (if applicable) for the above-requested service",
            postedBy: "Admin",
            updatedBy: "Admin",
            priorityLevel: "High"
        }
    ];

    const [complains] = useState(dummyComplains);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="wrapper">
            <DefaultLayout>
                <div className="complains">
                    <SpinnerLoader show={isLoading}>
                        {complains.map((complain, index) => (
                            <ComplainCard
                                complain={complain}
                                key={index}
                                isAdmin={true}
                            />
                        ))}
                    </SpinnerLoader>
                </div>
            </DefaultLayout>
        </div>
    );
};

export default Complaints;
