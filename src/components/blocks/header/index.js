import React from "react";
import "./header.scss";
import { menus } from "../../../modals/page";
import { NavLink } from "react-router-dom";
const Header = () => {
    return (
        <header className="headerWrap">
            <div className="societyWrap">
                <div className="name">Bayview Hill Gardens Society</div>
            </div>
            <div className="menuWrap">
                {menus.map((menu) => {
                    return (
                        <NavLink key={menu.name} to={menu.path}>
                            <div className="singleMenu">
                                <div className="iconWrap">{menu.icon}</div>
                                <div className="name">{menu.name}</div>
                            </div>
                        </NavLink>
                    );
                })}
            </div>
        </header>
    );
};

export default Header;
