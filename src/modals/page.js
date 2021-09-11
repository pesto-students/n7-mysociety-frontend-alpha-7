import * as Pages from "../pages";
import { ReactComponent as DashboardIcon } from "../svgs/dashboard.svg";
import { ReactComponent as AnnouncementIcon } from "../svgs/announcement.svg";
import { ReactComponent as EventIcon } from "../svgs/event.svg";
import { ReactComponent as GalleryIcon } from "../svgs/gallery.svg";
import { ReactComponent as ComplaintIcon } from "../svgs/complaint.svg";
import { ReactComponent as FAQIcon } from "../svgs/faq.svg";

export const links = [
    { menu: "Dashboard", path: "/dashboard", component: Pages.Dashboard },
    {
        menu: "Announcements",
        path: "/announcements",
        component: Pages.Announcements,
    },
    {
        menu: "Events",
        path: "/events",
        component: Pages.Events,
    },
    {
        menu: "Gallery",
        path: "/gallery",
        component: Pages.Gallery,
    },
    {
        menu: "Complaints",
        path: "/complaints",
        component: Pages.Complaints,
    },
    {
        menu: "FAQ",
        path: "/faq",
        component: Pages.FAQ,
    },
];

export const menus = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <DashboardIcon />,
    },
    {
        name: "Announcements",
        path: "/announcements",
        icon: <AnnouncementIcon />,
    },
    {
        name: "Events",
        path: "/events",
        icon: <EventIcon />,
    },
    {
        name: "Gallery",
        path: "/gallery",
        icon: <GalleryIcon />,
    },
    {
        name: "Complaints",
        path: "/complaints",
        icon: <ComplaintIcon />,
    },
    {
        name: "FAQ's",
        path: "/FAQ",
        icon: <FAQIcon />,
    },
];
