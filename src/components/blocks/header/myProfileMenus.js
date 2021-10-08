import { NavLink } from "react-router-dom";
import { adminProfileMenus, memberProfileMenus } from "../../../modals/page";
import { useSelector } from "react-redux";
import { isLoggedInAsAdmin } from "../../../store/selectors/authetication.selector";
import React, { useState, useEffect } from "react";
import { MenuItem } from "@material-ui/core";
import { LOGOUT_USER } from "../../../store/actions/authentication.action";
import { useDispatch } from "react-redux";
export default function MyProfileMenus() {
    const [currentMenus, setCurrentMenus] = useState([]);
    const dispatch = useDispatch();
    const isAdmin = useSelector(isLoggedInAsAdmin);
    console.log(adminProfileMenus, "adminProfileMenus");
    useEffect(() => {
        if (isAdmin) {
            setCurrentMenus(adminProfileMenus);
        } else {
            setCurrentMenus(memberProfileMenus);
        }
    }, []);

    return (
        <React.Fragment>
            {currentMenus.map((menu, index) => {
                return (
                    <MenuItem key={index}>
                        <NavLink
                            key={menu.menu}
                            to={menu.path}
                            className="profileMenuLink"
                            onClick={menu.exec ? menu.exec() : null}
                        >
                            <div className="singleMenu">
                                <div className="name">{menu.menu}</div>
                            </div>
                        </NavLink>
                    </MenuItem>
                );
            })}
            <MenuItem>
                <div
                    className="singleMenu"
                    onClick={() => dispatch({ type: LOGOUT_USER })}
                >
                    <div className="name">Logout</div>
                </div>
            </MenuItem>
        </React.Fragment>
    );
}
