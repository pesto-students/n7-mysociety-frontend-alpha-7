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
const ProfileCard = ({ content }) => {
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
        <Card className="profileCardWrap" elevation={1}>
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
                        <span className="text">{getAvatarName(userName)}</span>
                    </Avatar>
                )}

                <Typography variant="h6" component="h6" className="profileName">
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
                            <Typography variant="subtitle2" className="title">
                                FlatNo:
                            </Typography>
                            <Typography variant="subtitle2" className="name">
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
        </Card>
    );
};

ProfileCard.propTypes = {
    content: object.isRequired
};

export default ProfileCard;
