import React from "react";
import { Login } from "../components";
import LandingLayout from "../components/layout/landingPageLayout/landingLayout";
export default function Authetication() {
    return (
        <LandingLayout>
            <div className="authentication">
                <Login />
            </div>
        </LandingLayout>
    );
}
