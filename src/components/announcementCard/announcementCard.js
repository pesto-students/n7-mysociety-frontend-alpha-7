import React from "react";
import { CardHeader, Card, CardContent } from "../../shared";
import { formatDate } from "../../utils";
import { isLoggedInAsAdmin } from "../../store/selectors/authetication.selector";
import { useSelector } from "react-redux";
import "./announcementCard.scss";

export default function AnnouncementCard({ annoucement }) {
    const isAdmin = useSelector(isLoggedInAsAdmin);
    const dates = (
        <div className="dates">
            <div className="posted-on">
                <label>Posted On:</label>
                <span>{formatDate(annoucement.created_at, "DD-MM-YYYY")}</span>
            </div>
        </div>
    );

    return (
        <Card className="annoucement-card">
            <CardHeader title={annoucement.title}></CardHeader>
            <CardContent>
                <div className="description">{annoucement.desc}</div>
                {isAdmin ? <div className="admin-action">{dates}</div> : dates}
            </CardContent>
        </Card>
    );
}
