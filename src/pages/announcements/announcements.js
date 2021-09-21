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

    const fetchAnnouncements = (pageNumber) => {
        console.log(pageNumber);
        const payload = {
            limit: initalPaginator.limit,
            page: pageNumber,
            societyId: societyDetails._id,
            filterType: currentTab === 0 ? "latest" : "past"
        };
        dispatch(getAllAnnouncements(payload));
    };

    useEffect(() => fetchAnnouncements(1), [currentTab]);

    const handleTabChange = (e, v) => {
        e && e.stopPropagation();
        setTab(v);
    };

    const tabs = (
        <div className="tab-bar">
            <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab index={0} label="Latest" />
                <Tab index={1} label="Past" />
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
