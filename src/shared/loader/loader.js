import React from "react";
import { CircularProgress } from "../../shared";
import "./loader.scss";
export default function SpinnerLoader({ show, children, fullScreen }) {
    const fullScreenStyle = {
        position: "fixed",
        left: 0,
        right: 0,
        zIndex: 10000
    };
    const loader = (
        <div className="loader-container">
            <div
                className="backdrop"
                key="loader"
                style={fullScreen ? fullScreenStyle : { position: "relative" }}
            >
                <CircularProgress />
            </div>
        </div>
    );

    const childrenWithLoader = [
        <React.Fragment key="loader">{loader}</React.Fragment>,
        <React.Fragment key="childrens">{children}</React.Fragment>
    ];

    return (
        <React.Fragment>
            {show ? (fullScreen ? childrenWithLoader : loader) : children}
        </React.Fragment>
    );
}
