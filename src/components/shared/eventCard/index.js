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
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { openModal } from "../../../store/dispatchers/modal.dispatch";
import { deleteEvent } from "../../../store/dispatchers/event.dispatch";
import { ModalTypes } from "../../../modals/constant";
import { useSelector } from "react-redux";
import {
    isLoggedInAsAdmin,
    loggedInUserSocietyDetails
} from "../../../store/selectors/authetication.selector";
const EventCard = ({ event, isDashboardView }) => {
    const isAdmin = useSelector(isLoggedInAsAdmin);
    const dispatch = useDispatch();
    const [showAdminAction, setShowAdminAction] = useState(false);
    const { img, title, venue, desc, fromDateTime, toDateTime } = event;
    const diffTime = Math.abs(
        new Date(fromDateTime).getTime() - new Date(toDateTime).getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isoDate = `${new Date(fromDateTime)
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "")}/${new Date(toDateTime)
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "")}`;

    const calendarParam = {
        action: "TEMPLATE",
        text: title,
        dates: isoDate,
        details: desc,
        venue: venue,
        trp: false
    };

    const societyDetails = useSelector(loggedInUserSocietyDetails);

    const editEvent = () => {
        dispatch(openModal(ModalTypes.addEvent, "Edit Event", event));
    };

    const openView = () => {
        dispatch(openModal(ModalTypes.event, "View Event", event));
    };

    const delEvent = () => {
        const payload = {
            _id: event._id,
            societyId: societyDetails._id
        };
        dispatch(deleteEvent(payload));
    };

    const displayDate = (format, type, date, toDateTime = null) => {
        return (
            <Typography
                variant={type === "date" ? "h6" : "subtitle2"}
                color="textPrimary"
                component="p"
            >
                {date && toDateTime
                    ? `${moment(date).format(format)} - ${moment(
                          toDateTime
                      ).format(format)}`
                    : date
                    ? moment(date).format(format)
                    : ""}
            </Typography>
        );
    };
    return (
        <Card
            className={`eventCardWrap ${isDashboardView ? "dashboard" : ""}`}
            elevation={1}
            onMouseEnter={() => {
                setShowAdminAction(true);
            }}
            onMouseLeave={() => {
                setShowAdminAction(false);
            }}
        >
            <CardMedia
                image={img ? img : eventPlaceholder}
                title={title}
                className="eventImage"
                style={{ height: "216px" }}
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
                                aria-label="edit"
                                size="medium"
                                color="secondary"
                                onClick={() => editEvent()}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                size="medium"
                                color="secondary"
                                onClick={() => delEvent()}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </CSSTransition>
                )}
                {title && (
                    <div className="titleWrap">
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            component="h6"
                            className="eventTitle"
                        >
                            {limitSting(title, 25)}
                        </Typography>
                    </div>
                )}

                <div className="eventDateWrap">
                    <CalenderIcon className="icon" />
                    {diffDays <= 1 ? (
                        <div>
                            {displayDate(
                                "ddd, MMM DD, YYYY",
                                "date",
                                fromDateTime
                            )}
                            {displayDate(
                                "h:mm A",
                                "time",
                                fromDateTime,
                                toDateTime
                            )}
                        </div>
                    ) : (
                        <div className="diffDateWrap">
                            <div>
                                {displayDate(
                                    "ddd, MMM DD",
                                    "date",
                                    fromDateTime
                                )}
                                {displayDate("h:mm A", "time", fromDateTime)}
                            </div>
                            <span>-</span>
                            <div>
                                {displayDate("ddd, MMM DD", "date", toDateTime)}
                                {displayDate("h:mm A", "time", toDateTime)}
                            </div>
                        </div>
                    )}
                </div>
                {!isDashboardView && (
                    <React.Fragment>
                        {venue && (
                            <div className="locationWrap">
                                <MapPin className="icon" />
                                <div>
                                    <Typography
                                        variant="subtitle2"
                                        color="textPrimary"
                                        component="p"
                                    >
                                        {limitSting(venue, 50)}
                                    </Typography>
                                </div>
                            </div>
                        )}
                        {desc && (
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
                                    {limitSting(desc, 115)}
                                </Typography>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}
            </CardContent>
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
                    onClick={() => openView()}
                >
                    View Detail
                </Button>
            </CardActions>
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
        img: string,
        title: string,
        venue: string,
        desc: string,
        fromDateTime: date,
        toDateTime: date
    }),
    isDashboardView: bool,
    isAdmin: bool
};

export default EventCard;
