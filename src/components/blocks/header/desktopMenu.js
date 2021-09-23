import React from "react";
import "./header.scss";
import MySocietyMenu from "./mySocietyMenus";
import { loggedInUserSocietyDetails } from "../../../store/selectors/authetication.selector";
import { useSelector } from "react-redux";
export default function DeskTopMenu({ menus }) {
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    return (
        <header className="desktop-header headerWrap">
            <div className="societyWrap">
                <div className="name">{societyDetails?.name}</div>
            </div>
            <MySocietyMenu menus={menus} />
        </header>
    );
}
