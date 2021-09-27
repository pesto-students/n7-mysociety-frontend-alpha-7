import React from "react";
import { Switch, Route } from "react-router-dom";
import { links } from "../modals/page";
import ProtectedRoute from "./ProtectedRoute";
export default function Routing() {
    return (
        <Switch>
            {links.map((page, index) => {
                return page?.isProtected ? (
                    <ProtectedRoute key={index} exact {...page} />
                ) : (
                    <Route key={index} exact {...page} />
                );
            })}
        </Switch>
    );
}
