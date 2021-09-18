import React, { useState } from "react";
import {
    Drawer,
    AppBar,
    IconButton,
    ToolBar,
    makeStyles,
    MenuIcon,
    Avatar,
    Typography,
    CloseIcon
} from "../../../shared";
import MySocietyMenu from "./mySocietyMenus";
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
                    <div className="personal-details">
                        <Avatar alt="Remy Sharp" />
                        <Typography variant="h5">John Smith</Typography>
                        <span>
                            <CloseIcon onClick={handleDrawerToggle} />
                        </span>
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
