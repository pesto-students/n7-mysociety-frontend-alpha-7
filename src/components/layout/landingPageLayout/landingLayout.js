import React from "react";
import "./landingLayout.scss";
import SocietyImage from "../../../assets/images/societyImage.png";
import { SocietyIcon } from "../../../shared";
export default function LandingLayout({ children }) {
    return (
        <div className="landing-layout">
            <div className="left-part">
                <img src={SocietyImage} alt="Society"></img>
            </div>
            <div className="right-part">
                <div className="society-icon">
                    <SocietyIcon />
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}
