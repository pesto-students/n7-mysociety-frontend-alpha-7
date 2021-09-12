import React from "react";
import { CircularProgress } from "../../shared";
import "./loader.scss";
export default function SpinnerLoader({ show, children, fullScreen }) {
    const loader = (
        <div
            className="backdrop"
            style={{ position: fullScreen ? "absolute" : "relative" }}
        >
            <CircularProgress />
        </div>
    );

    return <React.Fragment>{show ? loader : children}</React.Fragment>;
}
