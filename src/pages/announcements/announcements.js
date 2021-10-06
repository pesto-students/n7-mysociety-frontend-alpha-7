import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnnouncements } from "../../store/dispatchers/announcement.dispatch";
import { announcementList } from "../../store/selectors/announcement.selector";
import { loggedInUserSocietyDetails } from "../../store/selectors/authetication.selector";
import {
    pagerDetails,
    loading
} from "../../store/selectors/announcement.selector";
import AnnouncementCard from "../../components/announcementCard/announcementCard";
import { SpinnerLoader, Paginator, Tabs, Tab } from "../../shared";
import { initalPaginator } from "../../modals/constant";
import "./announcements.scss";
const Announcements = () => {
    const dispatch = useDispatch();
    const listOfAnnouncements = useSelector(announcementList);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const annoucementLoadingState = useSelector(loading);
    const pager = useSelector(pagerDetails);
    const [currentTab, setTab] = useState(0);
    const [tabCount, setTabCount] = useState(0);

    useEffect(() => {
        setTabCount(listOfAnnouncements.totalDocs);
    }, [listOfAnnouncements]);
    const fetchAnnouncements = (pageNumber) => {
        const payload = {
            limit: initalPaginator.limit,
            page: pageNumber,
            societyId: societyDetails?._id,
            filterType: currentTab === 0 ? "latest" : "pasts"
        };
        dispatch(getAllAnnouncements(payload));
    };

    useEffect(() => {
        if (societyDetails?._id) {
            fetchAnnouncements(1);
        }
    }, [societyDetails, currentTab]);

    const handleTabChange = (e, v) => {
        e && e.stopPropagation();
        setTab(v);
        setTabCount(0);
    };
    const Counts = () => {
        return <div className="count">{tabCount}</div>;
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
                    label="Latest"
                    icon={currentTab === 0 ? <Counts /> : ""}
                />
                <Tab
                    index={1}
                    label="Past"
                    icon={currentTab === 1 ? <Counts /> : ""}
                />
            </Tabs>
        </div>
    );

    return (
        <div className="wrapper">
            <DefaultLayout>
                {tabs}
                <SpinnerLoader show={annoucementLoadingState} fullScreen={true}>
                    <Paginator
                        pageChange={(page) => fetchAnnouncements(page)}
                        pager={pager}
                        loading={annoucementLoadingState}
                    >
                        <div className="announcement-list">
                            {listOfAnnouncements?.docs?.map(
                                (announcement, index) => {
                                    return (
                                        <AnnouncementCard
                                            annoucement={announcement}
                                            key={index}
                                        ></AnnouncementCard>
                                    );
                                }
                            )}
                        </div>
                    </Paginator>
                </SpinnerLoader>
            </DefaultLayout>
        </div>
    );
};

export default Announcements;
