import React, { useState } from "react";
import LandingLayout from "../../components/layout/landingPageLayout/landingLayout";
import { ThankYouIcon, Typography } from "../../shared";
import "./thankYou.scss";
export default function ThankYou() {
    const [isAdmin] = useState(false);
    const [mailAddress] = useState("contact@mysociety.com");
    const thankyouHandIcon = (
        <div className="thank-you-icon">
            <ThankYouIcon />
        </div>
    );

    const thankYouLabel = (
        <div className="thank-you-label">
            <Typography variant="h4" color="text">
                Thank you,
            </Typography>
        </div>
    );

    const thankYouMessage = isAdmin ? (
        <div className="thank-you-message">
            <Typography varient="h6">
                Admin will process the further request, This process take
                usually 24 hours,in case of further inquiry please contact your
                society admin at
                <a href={`mailto:${mailAddress}?subject=Registration Concerns`}>
                    <Typography varient="h6" color="secondary">
                        {mailAddress}
                    </Typography>
                </a>
            </Typography>
        </div>
    ) : (
        <div className="thank-you-message">
            <Typography varient="h6" color="text">
                We have sent a mail to{" "}
                <a href={`mailto:${mailAddress}?subject=Registration Concerns`}>
                    <Typography varient="h6" color="secondary">
                        {mailAddress}
                    </Typography>
                </a>
                Please check your email for further Verification
            </Typography>
        </div>
    );

    return (
        <LandingLayout>
            <div className="thank-you-page">
                {thankyouHandIcon}
                {thankYouLabel}
                {thankYouMessage}
            </div>
        </LandingLayout>
    );
}
