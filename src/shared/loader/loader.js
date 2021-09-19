import React from "react";
import { CircularProgress } from "../../shared";
import "./loader.scss";
export default function SpinnerLoader({ show, children, fullScreen }) {
    const fullScreenStyle = {
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 10000
    };
    const loader = (
        <div
            className="backdrop"
            style={fullScreen ? fullScreenStyle : { position: "relative" }}
        >
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
