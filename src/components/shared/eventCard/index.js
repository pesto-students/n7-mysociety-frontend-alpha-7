import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from "@material-ui/core";
import React from "react";
import "./eventCard.scss";
import { object, boolean } from "prop-types";
import eventPlaceholder from "../../../assets/svgs/event_placeholder.svg";
import { ReactComponent as CalenderIcon } from "../../../assets/svgs/calendar.svg";
import { ReactComponent as MapPin } from "../../../assets/svgs/pin.svg";
import { encodeDataToURL, limitSting } from "../../../helpers/functions";
import moment from "moment";
const EventCard = ({ content, isDashboardView }) => {
    const diffTime = Math.abs(content.fromDate - content.toDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isoDate = `${content.fromDate
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "")}/${content.toDate
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "")}`;

    const calendarParam = {
        action: "TEMPLATE",
        text: content?.title,
        dates: isoDate,
        details: content?.about,
        location: content?.location,
        trp: false
    };

    return (
        <Card className="eventCardWrap" elevation={1}>
            <CardMedia
                image={content?.image ? content.image : eventPlaceholder}
                title={content?.title}
                className="eventImage"
            />
            <CardContent className="contentWrap">
                {content?.title && (
                    <Typography
                        variant="h5"
                        color="textSecondary"
                        component="h5"
                        className="eventTitle"
                    >
                        {content.title}
                    </Typography>
                )}

                <div className="eventDateWrap">
                    <CalenderIcon className="icon" />
                    {diffDays <= 1 ? (
                        <div>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                                component="p"
                            >
                                {moment(content.fromDate).format(
                                    "ddd, MMM DD, YYYY"
                                )}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="textPrimary"
                                component="p"
                            >
                                {`${moment(content.fromDate).format(
                                    "h:mm A"
                                )} - ${moment(content.toDate).format(
                                    "h:mm A"
                                )}`}
                            </Typography>
                        </div>
                    ) : (
                        <div className="diffDateWrap">
                            <div>
                                <Typography
                                    variant="h6"
                                    color="textPrimary"
                                    component="p"
                                >
                                    {moment(content.fromDate).format(
                                        "ddd, MMM DD"
                                    )}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="p"
                                >
                                    {moment(content.fromDate).format("h:mm A")}
                                </Typography>
                            </div>
                            <span>-</span>
                            <div>
                                <Typography
                                    variant="h6"
                                    color="textPrimary"
                                    component="p"
                                >
                                    {moment(content.toDate).format(
                                        "ddd, MMM DD"
                                    )}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="p"
                                >
                                    {moment(content.toDate).format("h:mm A")}
                                </Typography>
                            </div>
                        </div>
                    )}
                </div>
                {!isDashboardView && (
                    <React.Fragment>
                        {content?.location && (
                            <div className="locationWrap">
                                <MapPin className="icon" />
                                <div>
                                    <Typography
                                        variant="subtitle2"
                                        color="textPrimary"
                                        component="p"
                                    >
                                        {content.location}
                                    </Typography>
                                </div>
                            </div>
                        )}
                        {content?.about && (
                            <React.Fragment>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                    component="p"
                                    className="aboutTitle"
                                >
                                    About
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="textPrimary"
                                    component="p"
                                    className="aboutDes"
                                >
                                    {limitSting(content.about, 115)}
                                </Typography>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}

                <CardActions className="actionWrap">
                    <Button
                        href={`http://www.google.com/calendar/render?${encodeDataToURL(
                            calendarParam
                        )}`}
                        target="_blank"
                        rel="nofollow"
                        color="secondary"
                        role="button"
                        aria-label="Add to Calendar"
                    >
                        Add To Calendar
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        role="button"
                        aria-label="View Detail"
                        className="viewDetail"
                    >
                        View Detail
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};
/*
 * Proptype validations
 * @typedef {Object} OptionsProps
 * @property {Object} content - Set content of event as object
 * @property {Boolean} isDashboardView - Set dashboard view true, will show short details
 */
EventCard.propTypes = {
    content: object.isRequired,
    isDashboardView: boolean
};

export default EventCard;
