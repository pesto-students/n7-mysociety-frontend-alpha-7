import React from "react";
import { VerifySociety, ResetPassword } from "../components";
import LandingLayout from "../components/layout/landingPageLayout/landingLayout";
import { useParams } from "react-router";
export default function Verification() {
    const { action } = useParams();
    console.log(action, "action");
    const component = () => {
        if (action === "society") {
            return <VerifySociety />;
        }

        if (action === "reset-password") {
            return <ResetPassword />;
        }

        return null;
    };

    return (
        <LandingLayout>
            <div className="authentication">{component()}</div>
        </LandingLayout>
    );
}
