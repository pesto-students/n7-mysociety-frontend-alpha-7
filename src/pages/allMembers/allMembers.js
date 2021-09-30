import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/dispatchers/user.dispatch";
import { loggedInUserSocietyDetails } from "../../store/selectors/authetication.selector";
import {
    pagerDetails,
    isUserLoading,
    userList
} from "../../store/selectors/user.selector";
import { SpinnerLoader, Paginator, Tabs, Tab } from "../../shared";
import { initalPaginator } from "../../modals/constant";
import ProfileCard from "../../components/shared/profileCard";
import "./allMembers.scss";
const AllMembers = () => {
    const dispatch = useDispatch();
    const listOfUsers = useSelector(userList);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const usersLoadingState = useSelector(isUserLoading);
    const pager = useSelector(pagerDetails);
    const [currentTab, setTab] = useState(0);

    const [tabCount, setTabCount] = useState(0);

    useEffect(() => {
        setTabCount(listOfUsers.totalDocs);
    }, [listOfUsers]);

    const fetchUsers = (pageNumber) => {
        console.log(pageNumber);
        const payload = {
            limit: initalPaginator.limit,
            page: pageNumber,
            societyId: societyDetails._id,
            getAll: true
        };
        if (currentTab === 0) {
            payload.isConfirmed = false;
        } else if (currentTab === 1) {
            payload.isActive = true;
        } else if (currentTab === 2) {
            payload.isActive = false;
        }
        dispatch(getAllUsers(payload));
    };

    useEffect(() => fetchUsers(1), [currentTab]);

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
                    label="Pending"
                    icon={currentTab === 0 ? <Counts /> : ""}
                />
                <Tab
                    index={1}
                    label="Active"
                    icon={currentTab === 1 ? <Counts /> : ""}
                />
                <Tab
                    index={2}
                    label="Deactivated"
                    icon={currentTab === 2 ? <Counts /> : ""}
                />
            </Tabs>
        </div>
    );

    return (
        <div className="wrapper">
            <DefaultLayout>
                {tabs}
                <SpinnerLoader show={usersLoadingState} fullScreen={true}>
                    <Paginator
                        pageChange={(page) => fetchUsers(page)}
                        pager={pager}
                        loading={usersLoadingState}
                    >
                        <div className="user-list">
                            {listOfUsers?.docs?.map((profile, index) => {
                                return (
                                    <ProfileCard
                                        content={profile}
                                        key={index}
                                    ></ProfileCard>
                                );
                            })}
                        </div>
                    </Paginator>
                </SpinnerLoader>
            </DefaultLayout>
        </div>
    );
};

export default AllMembers;
