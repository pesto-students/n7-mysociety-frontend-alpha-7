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
            ></div>
            <CircularProgress />
        </div>
    );

    const childrenWithLoader = [loader, children];

    return (
        <React.Fragment>
            {show ? (fullScreen ? childrenWithLoader : loader) : children}
        </React.Fragment>
    );
}
