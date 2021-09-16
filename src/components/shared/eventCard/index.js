import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    IconButton
} from "@material-ui/core";
import React, { useState } from "react";
import "./eventCard.scss";
import { date, string, shape, bool } from "prop-types";
import eventPlaceholder from "../../../assets/svgs/event_placeholder.svg";
import { ReactComponent as CalenderIcon } from "../../../assets/svgs/calendar.svg";
import { ReactComponent as MapPin } from "../../../assets/svgs/pin.svg";
import { encodeDataToURL, limitSting } from "../../../helpers/functions";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { CSSTransition } from "react-transition-group";
const EventCard = ({ content, isDashboardView, isAdmin }) => {
    const [showAdminAction, setShowAdminAction] = useState(false);
    const { image, title, location, about, fromDate, toDate } = content;
    const diffTime = Math.abs(fromDate - toDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isoDate = `${fromDate
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "")}/${toDate
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "")}`;

    const calendarParam = {
        action: "TEMPLATE",
        text: title,
        dates: isoDate,
        details: about,
        location: location,
        trp: false
    };

    const displayDate = (format, type, date, toDate = null) => {
        return (
            <Typography
                variant={type === "date" ? "h6" : "subtitle2"}
                color="textPrimary"
                component="p"
            >
                {date && toDate
                    ? `${moment(date).format(format)} - ${moment(toDate).format(
                          format
                      )}`
                    : date
                    ? moment(date).format(format)
                    : ""}
            </Typography>
        );
    };
    return (
        <Card
            className="eventCardWrap"
            elevation={1}
            onMouseEnter={() => {
                setShowAdminAction(true);
            }}
            onMouseLeave={() => {
                setShowAdminAction(false);
            }}
        >
            <CardMedia
                image={image ? image : eventPlaceholder}
                title={title}
                className="eventImage"
            />
            <CardContent className="contentWrap">
                {isAdmin && (
                    <CSSTransition
                        key="adminAction"
                        in={showAdminAction}
                        timeout={1000}
                        className="slide"
                        unmountOnExit
                    >
                        <CardActions className="adminAction">
                            <IconButton
                                aria-label="delete"
                                size="medium"
                                color="secondary"
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                size="medium"
                                color="secondary"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </CSSTransition>
                )}
                {title && (
                    <div className="titleWrap">
                        <Typography
                            variant="h5"
                            color="textSecondary"
                            component="h5"
                            className="eventTitle"
                        >
                            {title}
                        </Typography>
                    </div>
                )}

                <div className="eventDateWrap">
                    <CalenderIcon className="icon" />
                    {diffDays <= 1 ? (
                        <div>
                            {displayDate("ddd, MMM DD, YYYY", "date", fromDate)}
                            {displayDate("h:mm A", "time", fromDate, toDate)}
                        </div>
                    ) : (
                        <div className="diffDateWrap">
                            <div>
                                {displayDate("ddd, MMM DD", "date", fromDate)}
                                {displayDate("h:mm A", "time", fromDate)}
                            </div>
                            <span>-</span>
                            <div>
                                {displayDate("ddd, MMM DD", "date", toDate)}
                                {displayDate("h:mm A", "time", toDate)}
                            </div>
                        </div>
                    )}
                </div>
                {!isDashboardView && (
                    <React.Fragment>
                        {location && (
                            <div className="locationWrap">
                                <MapPin className="icon" />
                                <div>
                                    <Typography
                                        variant="subtitle2"
                                        color="textPrimary"
                                        component="p"
                                    >
                                        {location}
                                    </Typography>
                                </div>
                            </div>
                        )}
                        {about && (
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
                                    {limitSting(about, 115)}
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
 * @property {Shape} content - Set content of event as object
 * @property {Boolean} isDashboardView - Set dashboard view true, will show short details
 * @property {Boolean} isAdmin - Set is admin view or not
 */
EventCard.propTypes = {
    content: shape({
        image: string,
        title: string,
        location: string,
        about: string,
        fromDate: date,
        toDate: date
    }),
    isDashboardView: bool,
    isAdmin: bool
};

export default EventCard;
