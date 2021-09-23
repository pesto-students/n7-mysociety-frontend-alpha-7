import { Avatar, Button, Menu, Typography } from "@material-ui/core";
import React from "react";
import "./header.scss";
import MySocietyMenu from "./mySocietyMenus";
import { getAvatarName } from "../../../helpers/functions";
import MyProfileMenus from "./myProfileMenus";
import { useSelector } from "react-redux";
import { loggedInUserDetails } from "../../../store/selectors/authetication.selector";
export default function DeskTopMenu({ menus }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const userData = useSelector(loggedInUserDetails);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const content = { userName: `${userData.firstName} ${userData.lastName}` };
    return (
        <header className="desktop-header headerWrap">
            <div className="societyWrap">
                <div className="name">Bayview Hill Gardens Society</div>

                <div className="personal-details desktop">
                    <div>
                        <Button
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            className="userProfileButton"
                            disableRipple={true}
                            disableFocusRipple={true}
                        >
                            {content?.avatarUrl ? (
                                <Avatar
                                    alt={content?.userName}
                                    src={`${content?.avatarUrl}`}
                                    className="avatar avatarMedia"
                                    role="img"
                                    aria-label={content?.userName}
                                />
                            ) : (
                                <Avatar
                                    className="avatar avatarName"
                                    role="img"
                                    aria-label={content?.userName}
                                >
                                    <span className="text">
                                        {getAvatarName(content?.userName)}
                                    </span>
                                </Avatar>
                            )}
                            <Typography
                                variant="h6"
                                component="h6"
                                className="profileName"
                            >
                                {content?.userName}
                            </Typography>
                        </Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            transformOrigin={{
                                horizontal: "right",
                                vertical: "top"
                            }}
                            anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom"
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MyProfileMenus />
                        </Menu>
                    </div>
                </div>
            </div>
            <MySocietyMenu menus={menus} />
        </header>
    );
}
