import React from "react";
import { CircularProgress } from "../../shared";
import "./loader.scss";
export default function SpinnerLoader({ show, children, fullScreen, partial }) {
    const fullScreenStyle = {
        position: "fixed",
        left: 0,
        right: 0,
        zIndex: 10000,
        background: "rgba(0, 0, 0, 0.6)"
    };
    const loader = (
        <div
            className="loader-container backdrop"
            key="loader"
            style={fullScreen ? fullScreenStyle : { position: "relative" }}
        >
            <CircularProgress />
        </div>
    );

    const childrenWithLoader = [
        <React.Fragment key="loader">{loader}</React.Fragment>,
        <React.Fragment key="childrens">{children}</React.Fragment>
    ];

    const partialLoader = (
        <div className="loader-container backdrop" key="loader">
            <CircularProgress style={{ position: "fixed" }} />
            {children}
        </div>
    );

    return (
        <React.Fragment>
            {show
                ? partial
                    ? partialLoader
                    : fullScreen
                    ? childrenWithLoader
                    : loader
                : children}
        </React.Fragment>
    );
}
