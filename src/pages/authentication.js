import React from "react";
import { Register, Login } from "../components";
import LandingLayout from "../components/layout/landingPageLayout/landingLayout";
import { useParams } from "react-router";
export default function Authetication() {
    const { action } = useParams();

    const component = () => {
        if (action === "register") {
            return <Register />;
        }

        if (action === "login") {
            return <Login />;
        }

        return <Login />;
    };

    return (
        <LandingLayout>
            <div className="authentication">{component()}</div>
        </LandingLayout>
    );
}
