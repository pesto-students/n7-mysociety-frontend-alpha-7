import React from "react";
import "./header.scss";
import { ReactComponent as DashboardIcon } from "../../../svgs/dashboard.svg";
const Header = () => {
    return (
        <header className="headerWrap">
            <div className="societyWrap">
                <div className="name">Bayview Hill Gardens Society</div>
            </div>
            <div className="menuWrap">
                <div className="singleMenu">
                    <div className="iconWrap">
                        <DashboardIcon />
                    </div>
                    <div className="name">Dashboard</div>
                </div>
                <div className="singleMenu">
                    <div className="iconWrap">
                        <DashboardIcon />
                    </div>
                    <div className="name">Dashboard</div>
                </div>
            </div>
        </header>
    );
};

export default Header;
