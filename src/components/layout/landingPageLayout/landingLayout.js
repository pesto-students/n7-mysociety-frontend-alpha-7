import React from "react";
import "./landingLayout.scss";
import SocietyImage from "../../../assets/images/societyImage.png";
export default function LandingLayout({ children }) {
    return (
        <div className="landing-layout">
            <div className="left-part">
                <img src={SocietyImage} alt="Society"></img>
            </div>
            <div className="right-part">{children}</div>
        </div>
    );
}
