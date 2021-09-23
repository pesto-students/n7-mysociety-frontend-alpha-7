import React, { useState } from "react";
import {
    Drawer,
    AppBar,
    IconButton,
    ToolBar,
    makeStyles,
    MenuIcon
} from "../../../shared";
import { Avatar, Button, Menu, Typography } from "@material-ui/core";
import { getAvatarName } from "../../../helpers/functions";
import MySocietyMenu from "./mySocietyMenus";
import MyProfileMenus from "./myProfileMenus";
import { useSelector } from "react-redux";
import { loggedInUserDetails } from "../../../store/selectors/authetication.selector";
import "./header.scss";

const drawerWidth = "80%";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    drawerPaper: {
        width: drawerWidth,
        background: theme.palette.background.primary
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

export default function MobileSideBarMenu({ menus }) {
    const container =
        window !== undefined ? () => window.document.body : undefined;

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const userData = useSelector(loggedInUserDetails);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const content = { userName: `${userData.firstName} ${userData.lastName}` };

    const classes = useStyles();
    const sideBarMenu = () => {
        return (
            <Drawer
                container={container}
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                    paper: classes.drawerPaper
                }}
                ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                }}
                elevation={0}
            >
                <React.Fragment>
                    <div className="personal-details mobile">
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
                                    horizontal: "left",
                                    vertical: "top"
                                }}
                                anchorOrigin={{
                                    horizontal: "left",
                                    vertical: "bottom"
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MyProfileMenus />
                            </Menu>
                        </div>
                    </div>
                    <MySocietyMenu menus={menus} />
                </React.Fragment>
            </Drawer>
        );
    };

    const appBar = () => {
        return (
            <AppBar position="fixed" className={classes.appBar} elevation={0}>
                <ToolBar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="societyWrap">
                        <div className="name">Bayview Hill Gardens Society</div>
                    </div>
                </ToolBar>
            </AppBar>
        );
    };

    return (
        <header className="mobile-header headerWrap">
            {appBar()}
            {sideBarMenu()}
        </header>
    );
}
