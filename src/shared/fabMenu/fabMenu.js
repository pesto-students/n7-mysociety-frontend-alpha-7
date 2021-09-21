import React from "react";
import { Fab, Action } from "react-tiny-fab";
import {
    AddIcon,
    EventIcon,
    RecordVoiceOverIcon,
    CameraAltIcon,
    AssignmentTurnedInIcon
} from "..";
import "react-tiny-fab/dist/styles.css";
import "./fabMenu.scss";
import { ModalTypes } from "../../modals/constant";
import { useDispatch, useSelector } from "react-redux";
import * as MODAL_ACTION from "../../store/actions/modal.action";
import { isLoggedInAsAdmin } from "../../store/selectors/authetication.selector";
export default function FabMenu() {
    const dispatch = useDispatch();
    const isAdmin = useSelector(isLoggedInAsAdmin);
    const getModalTitle = (type) => {
        switch (type) {
            case ModalTypes.addComplain:
                return "Add/Edit Complain";
            case ModalTypes.addEvent:
                return "Add/Edit Event";
            case ModalTypes.addGallery:
                return "Add/Edit Gallery";
            case ModalTypes.addAnnouncement:
                return "Add/Edit Announcement";
            default:
                return "";
        }
    };

    const openPopup = (type) => {
        dispatch({
            type: MODAL_ACTION.OPEN_MODAL,
            payload: {
                type: type,
                modalHeader: getModalTitle(type),
                data: null
            }
        });
    };

    const adminMenus = [
        <Action
            text="Add Announcement"
            onClick={() => openPopup(ModalTypes.addAnnouncement)}
            key="annoucement"
        >
            <RecordVoiceOverIcon />
        </Action>,
        <Action
            text="Add Event"
            onClick={() => openPopup(ModalTypes.addEvent)}
            key="event"
        >
            <EventIcon />
        </Action>,
        <Action
            text="Add Gallery"
            onClick={() => openPopup(ModalTypes.addGallery)}
            key="gallery"
        >
            <CameraAltIcon />
        </Action>
    ];

    const memberMenus = [
        <Action
            text="Add Complain"
            onClick={() => openPopup(ModalTypes.addComplain)}
            key="complain"
        >
            <AssignmentTurnedInIcon />
        </Action>
    ];

    return (
        <div className="fab-menus">
            <Fab icon={<AddIcon />} alwaysShowTitle={true} event="click">
                {isAdmin ? adminMenus : memberMenus}
            </Fab>
        </div>
    );
}
