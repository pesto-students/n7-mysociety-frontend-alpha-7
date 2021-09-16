import React from "react";
import { Fab, Action } from "react-tiny-fab";
import { AddIcon } from "..";
import "react-tiny-fab/dist/styles.css";
export default function FabMenu() {
    const openPopup = () => {};
    return (
        <div>
            <Fab icon={<AddIcon />} alwaysShowTitle={true}>
                <Action text="Add Announcement" onClick={openPopup}></Action>
                <Action text="Add Event" onClick={openPopup}></Action>
                <Action text="Add Gallery" onClick={openPopup}></Action>
                <Action text="Add Complain" onClick={openPopup}></Action>
            </Fab>
        </div>
    );
}
