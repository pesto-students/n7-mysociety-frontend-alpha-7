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
import { object } from "prop-types";
const ProfileCard = ({ content }) => {
    return (
        <Card className="profileCardWrap" elevation={1}>
            <CardActionArea className="actionWrap">
                {content?.avatarUrl ? (
                    <Avatar
                        alt={content?.userName}
                        src={`${content?.avatarUrl}`}
                        className="avatar avatarMedia"
                        role="img"
                        aria-label={content?.userName}
                    />
                ) : (
                    <Avatar
                        className="avatar avatarName"
                        role="img"
                        aria-label={content?.userName}
                    >
                        <span className="text">
                            {getAvatarName(content?.userName)}
                        </span>
                    </Avatar>
                )}

                <Typography variant="h6" component="h6" className="profileName">
                    {content?.userName}
                </Typography>
                <CardActions className="infoWrap">
                    {content?.phone && (
                        <Button
                            href={`tel:${content.phone}`}
                            target="_blank"
                            rel="noreferrer"
                            role="button"
                            aria-label="Phone Number"
                        >
                            <PhoneIcon className="contactIcon" />
                            {content.phone}
                        </Button>
                    )}
                    {content?.building && (
                        <span className="buildingInfo">
                            <Typography variant="subtitle2" className="title">
                                Building:
                            </Typography>
                            <Typography variant="subtitle2" className="name">
                                {content.building}
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
