import React from "react";
import "./header.scss";
import MySocietyMenu from "./mySocietyMenus";
export default function DeskTopMenu({ menus }) {
    return (
        <header className="desktop-header headerWrap">
            <div className="societyWrap">
                <div className="name">Bayview Hill Gardens Society</div>
            </div>
            <MySocietyMenu menus={menus} />
        </header>
    );
}
