import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardActions,
    Typography
} from "@material-ui/core";
import React from "react";
import "./profileCard.scss";
import { ReactComponent as PhoneIcon } from "../../../assets/svgs/mobile.svg";
import { ReactComponent as MailIcon } from "../../../assets/svgs/mail.svg";
import { getAvatarName } from "../../../helpers/functions";
import { useDispatch } from "react-redux";
import { ModalTypes } from "../../../modals/constant";
import { openModal } from "../../../store/dispatchers/modal.dispatch";
import { object } from "prop-types";
import { formatDate } from "../../../utils";
const ProfileCard = ({ content, isDashboardView }) => {
    const userName = `${content?.firstName} ${content?.lastName}`;
    const dispatch = useDispatch();
    const takeAction = () => {
        console.log("click run");
        openPopup(ModalTypes.addUser, "Society Member Profile");
    };
    /*const editComplaint = () => {
        openPopup(ModalTypes.addComplain, "Edit Complaint");
    };*/
    const openPopup = (type, title) => {
        dispatch(openModal(type, title, content));
    };
    return (
        <Card
            className={`profileCardWrap ${isDashboardView && "isDashboard"}`}
            elevation={1}
        >
            {isDashboardView ? (
                <div className="actionWrap">
                    <div className="newMemberWrap">
                        <div className="info">
                            <Typography
                                variant="h6"
                                component="h6"
                                className="userName"
                            >
                                {userName}
                            </Typography>
                            <div className="createdAt">
                                <span>Resiterd On:</span>
                                <Typography
                                    variant="subtitle2"
                                    component="p"
                                    className="createdDate"
                                >
                                    {formatDate(
                                        content.created_at,
                                        "DD-MM-YYYY"
                                    )}
                                </Typography>
                            </div>
                        </div>
                        <div className="action">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={takeAction}
                            >
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <CardActionArea className="actionWrap" onClick={takeAction}>
                    {content?.avatarUrl ? (
                        <Avatar
                            alt={userName}
                            src={`${content?.avatarUrl}`}
                            className="avatar avatarMedia"
                            role="img"
                            aria-label={userName}
                        />
                    ) : (
                        <Avatar
                            className="avatar avatarName"
                            role="img"
                            aria-label={userName}
                        >
                            <span className="text">
                                {getAvatarName(userName)}
                            </span>
                        </Avatar>
                    )}

                    <Typography
                        variant="h6"
                        component="h6"
                        className="profileName"
                    >
                        {userName}
                    </Typography>
                    <CardActions className="infoWrap">
                        {content?.mobile && (
                            <Button
                                href={`tel:${content.mobile}`}
                                target="_blank"
                                rel="noreferrer"
                                role="button"
                                aria-label="Phone Number"
                            >
                                <PhoneIcon className="contactIcon" />
                                {content.mobile}
                            </Button>
                        )}
                        {content?.flatNo && (
                            <span className="buildingInfo">
                                <Typography
                                    variant="subtitle2"
                                    className="title"
                                >
                                    FlatNo:
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    className="name"
                                >
                                    {content.flatNo}
                                </Typography>
                            </span>
                        )}
                    </CardActions>
                    {content?.email && (
                        <CardActions className="infoWrap">
                            <Button
                                href={`mailto:${content.email}?subject=Society Concern`}
                                target="_blank"
                                rel="noreferrer"
                                role="button"
                                aria-label="Email Address"
                            >
                                <MailIcon className="contactIcon" />
                                {content.email}
                            </Button>
                        </CardActions>
                    )}
                </CardActionArea>
            )}
        </Card>
    );
};

ProfileCard.propTypes = {
    content: object.isRequired
};

export default ProfileCard;
