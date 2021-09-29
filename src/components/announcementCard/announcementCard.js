import React, { useContext } from "react";
import {
    CardHeader,
    Card,
    CardContent,
    UserActions,
    Button
} from "../../shared";
import { formatDate } from "../../utils";
import { limitSting } from "../../helpers/functions";
import {
    isLoggedInAsAdmin,
    loggedInUserSocietyDetails
} from "../../store/selectors/authetication.selector";
import { useSelector, useDispatch } from "react-redux";
import { deleteAnnouncement } from "../../store/dispatchers/announcement.dispatch";
import { ButtonVarientContext } from "../../contexts/variant.context";
import { openModal } from "../../store/dispatchers/modal.dispatch";
import "./announcementCard.scss";
import { ModalTypes } from "../../modals/constant";
export default function AnnouncementCard({ annoucement, isDashboard }) {
    const isAdmin = useSelector(isLoggedInAsAdmin);
    const buttonVarient = useContext(ButtonVarientContext);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const dispatch = useDispatch();
    const dates = (
        <div className="dates">
            <div className="posted-on">
                <label>Posted On:</label>
            </div>
            <div>
                <span>{formatDate(annoucement.created_at, "DD-MM-YYYY")}</span>
            </div>
        </div>
    );

    const delAnnouncement = () => {
        const param = {
            societyId: societyDetails._id,
            _id: annoucement._id
        };
        dispatch(deleteAnnouncement(param));
    };

    const onEdit = () => {
        openPopup(ModalTypes.addAnnouncement, "Edit Announcement");
    };

    const openPopup = (type, title) => {
        dispatch(openModal(type, title, annoucement));
    };

    const onReadMore = () => {
        openPopup(ModalTypes.announcement, annoucement.title);
    };

    const actions = {
        canEdit: isAdmin,
        canDelete: isAdmin,

        onEdit: onEdit,
        onDelete: delAnnouncement
    };

    return (
        <Card className="annoucement-card">
            <div className="cardHeaderWrap">
                <CardHeader title={annoucement.title}></CardHeader>
                {isAdmin ? (
                    <UserActions {...actions} show={!isDashboard} />
                ) : null}
            </div>
            <CardContent>
                <div className="description">
                    {limitSting(annoucement.desc, 360)}
                </div>
                <div className="date-action">
                    {dates}
                    <div>
                        <Button
                            variant={buttonVarient}
                            color="primary"
                            onClick={() => onReadMore()}
                        >
                            Read More
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
