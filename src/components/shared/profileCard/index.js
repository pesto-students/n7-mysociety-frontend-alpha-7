import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
} from "@material-ui/core";
import React from "react";
import "./profileCard.scss";
import { ReactComponent as PhoneIcon } from "../../../assets/svgs/mobile.svg";
import { ReactComponent as MailIcon } from "../../../assets/svgs/mail.svg";
const ProfileCard = () => {
    return (
        <Card className="profileCardWrap" elevation={1}>
            <CardActionArea className="actionWrap">
                <Avatar
                    alt="Remy Sharp"
                    src="/logo512.png"
                    className="avatarMedia"
                />
                <Typography variant="h6" component="h6" className="profileName">
                    John Smith
                </Typography>
                <CardActions className="infoWrap">
                    <Button
                        href="tel:888998343"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <PhoneIcon className="contactIcon" />
                        888998343
                    </Button>
                    <span className="buildingInfo">
                        <Typography variant="subtitle2" className="title">
                            building:
                        </Typography>
                        <Typography variant="subtitle2" className="name">
                            B19
                        </Typography>
                    </span>
                </CardActions>
                <CardActions className="infoWrap">
                    <Button
                        href="mailto:john@gmail.com?subject=Society Concern"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <MailIcon className="contactIcon" />
                        john@gmail.com
                    </Button>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};

export default ProfileCard;
