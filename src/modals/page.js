import * as Pages from "../pages";
import { ReactComponent as DashboardIcon } from "../assets/svgs/dashboard.svg";
import { ReactComponent as AnnouncementIcon } from "../assets/svgs/announcement.svg";
import { ReactComponent as EventIcon } from "../assets/svgs/event.svg";
import { ReactComponent as GalleryIcon } from "../assets/svgs/gallery.svg";
import { ReactComponent as ComplaintIcon } from "../assets/svgs/complaint.svg";
import { ReactComponent as FAQIcon } from "../assets/svgs/faq.svg";

export const links = [
    { menu: "Dashboard", path: "/", component: Pages.Dashboard },
    { menu: "Dashboard", path: "/dashboard", component: Pages.Dashboard },
    {
        menu: "Announcements",
        path: "/announcements",
        component: Pages.Announcements
    },
    {
        menu: "Events",
        path: "/events",
        component: Pages.Events
    },
    {
        menu: "Gallery",
        path: "/gallery",
        component: Pages.Gallery
    },
    {
        menu: "Complaints",
        path: "/complaints",
        component: Pages.Complaints
    },
    {
        menu: "FAQ",
        path: "/faq",
        component: Pages.FAQ
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
        path: "/FAQ",
        icon: <FAQIcon />
    }
];
