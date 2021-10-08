import React from "react";
import * as Pages from "../pages";
import { ReactComponent as DashboardIcon } from "../assets/svgs/dashboard.svg";
import { ReactComponent as AnnouncementIcon } from "../assets/svgs/announcement.svg";
import { ReactComponent as EventIcon } from "../assets/svgs/event.svg";
import { ReactComponent as GalleryIcon } from "../assets/svgs/gallery.svg";
import { ReactComponent as ComplaintIcon } from "../assets/svgs/complaint.svg";
import { ReactComponent as FAQIcon } from "../assets/svgs/faq.svg";

export const links = [
    { path: "/", component: Pages.Authentication, menu: "MySociety" },
    { path: "/user", component: Pages.Authentication },
    { path: "/user/:action", component: Pages.Authentication },
    { path: "/verify/:action/:token", component: Pages.Verification },
    { path: "/thankyou", component: Pages.ThankYou },
    {
        menu: "Dashboard",
        path: "/dashboard",
        component: Pages.Dashboard,
        isProtected: true
    },
    {
        menu: "Announcements",
        path: "/announcements",
        component: Pages.Announcements,
        isProtected: true
    },
    {
        menu: "Events",
        path: "/events",
        component: Pages.Events,
        isProtected: true
    },
    {
        menu: "Gallery",
        path: "/gallery",
        component: Pages.Gallery,
        isProtected: true
    },
    {
        menu: "Complaints",
        path: "/complaints",
        component: Pages.Complaints,
        isProtected: true
    },
    {
        menu: "FAQ",
        path: "/faq",
        component: Pages.FAQ,
        isProtected: true
    },
    {
        menu: "Profile",
        path: "/profile",
        component: Pages.Profile,
        isProtected: true
    },
    {
        menu: "All Members",
        path: "/all-members",
        component: Pages.AllMembers,
        isProtected: true
    },
    {
        menu: "Society Profile",
        path: "/society-profile",
        component: Pages.SocietyProfile,
        isProtected: true
    },
    {
        menu: "Logout",
        path: "/logout",
        component: Pages.Logout,
        isMenu: true
    }
];

export const menus = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <DashboardIcon />
    },
    {
        name: "Announcements",
        path: "/announcements",
        icon: <AnnouncementIcon />
    },
    {
        name: "Events",
        path: "/events",
        icon: <EventIcon />
    },
    {
        name: "Gallery",
        path: "/gallery",
        icon: <GalleryIcon />
    },
    {
        name: "Complaints",
        path: "/complaints",
        icon: <ComplaintIcon />
    },
    {
        name: "FAQ's",
        path: "/faq",
        icon: <FAQIcon />
    }
];

export const adminProfileMenus = [
    {
        menu: "Profile",
        path: "/profile",
        component: Pages.Profile,
        isMenu: true
    },
    {
        menu: "All Members",
        path: "/all-members",
        component: Pages.AllMembers,
        isMenu: true
    },
    {
        menu: "Society Profile",
        path: "/society-profile",
        component: Pages.SocietyProfile,
        isMenu: true
    }
];

export const memberProfileMenus = [
    {
        menu: "Profile",
        path: "/profile",
        component: Pages.Profile,
        isMenu: true
    }
];
