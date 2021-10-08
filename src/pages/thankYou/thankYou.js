import React from "react";
import LandingLayout from "../../components/layout/landingPageLayout/landingLayout";
import { ThankYouIcon, Typography } from "../../shared";
import { useSelector } from "react-redux";
import {
    isRegisteredAsAdmin,
    registeredUserDetails
} from "../../store/selectors/authetication.selector";
import "./thankYou.scss";
export default function ThankYou() {
    const isAdmin = useSelector(isRegisteredAsAdmin);
    const userDetails = useSelector(registeredUserDetails);
    const thankyouHandIcon = (
        <div className="thank-you-icon">
            <ThankYouIcon />
        </div>
    );

    const thankYouLabel = (
        <div className="thank-you-label">
            <Typography variant="h4">Thank you,</Typography>
        </div>
    );

    const thankYouMessage = isAdmin ? (
        <div className="thank-you-message">
            <Typography varient="h6">
                We have sent a mail to
                <a
                    href={`mailto:${userDetails.email}?subject=Registration Concerns`}
                >
                    {userDetails?.email}
                </a>
                Please check your email for further Verification
            </Typography>
        </div>
    ) : (
        <div className="thank-you-message">
            <Typography varient="h6">
                Admin will process the further request, This process take
                usually 24 hours,in case of further inquiry please contact your
                society admin at
                <a
                    href={`mailto:${userDetails?.email}?subject=Registration Concerns`}
                >
                    <Typography varient="h6" color="secondary">
                        {userDetails?.email}
                    </Typography>
                </a>
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
