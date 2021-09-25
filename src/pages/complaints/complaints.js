import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { ComplainCard } from "../../components";
import { SpinnerLoader, Paginator, Tabs, Tab } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import { getAllComplaints } from "../../store/dispatchers/complaint.dispatch";
import { complaintList } from "../../store/selectors/complaint.selector";
import { loggedInUserSocietyDetails } from "../../store/selectors/authetication.selector";
import { initalPaginator } from "../../modals/constant";
import {
    pagerDetails,
    loading
} from "../../store/selectors/complaint.selector";
import "./complaints.scss";

const Complaints = () => {
    const dispatch = useDispatch();
    const listOfComplaints = useSelector(complaintList);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const complaintLoadingState = useSelector(loading);
    const pager = useSelector(pagerDetails);
    const [currentTab, setTab] = useState(0);

    const fetchComplaints = (pageNumber) => {
        var status = "";
        switch (currentTab) {
            case 0:
                status = "Pending";
                break;
            case 1:
                status = "Resolved";
                break;
            case 2:
                status = "Reject";
                break;
            default:
                break;
        }
        console.log(currentTab, "status ........");
        const payload = {
            limit: initalPaginator.limit,
            page: pageNumber,
            societyId: societyDetails?._id,
            status: status
        };
        dispatch(getAllComplaints(payload));
    };
    useEffect(() => fetchComplaints(1), [currentTab]);

    const handleTabChange = (e, v) => {
        e && e.stopPropagation();
        setTab(v);
    };

    const tabs = (
        <div className="tab-bar">
            <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab index={0} label="Pending" />
                <Tab index={1} label="Resolved" />
                <Tab index={2} label="Reject" />
            </Tabs>
        </div>
    );
    return (
        <div className="wrapper">
            <DefaultLayout>
                {tabs}
                <SpinnerLoader show={complaintLoadingState} fullScreen={true}>
                    <Paginator
                        pageChange={(page) => fetchComplaints(page)}
                        pager={pager}
                        loading={complaintLoadingState}
                    >
                        <div className="complaint-list">
                            {listOfComplaints?.docs?.map((complaint, index) => {
                                return (
                                    <ComplainCard
                                        complaint={complaint}
                                        key={index}
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

export default Complaints;
