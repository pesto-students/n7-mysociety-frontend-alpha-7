import React from "react";
import { Switch, Route } from "react-router-dom";
import { links } from "../modals/page";
import ProtectedRoute from "./ProtectedRoute";
import { _404NotFound } from "../pages";
export default function Routing() {
    return (
        <Switch>
            {links.map((page, index) => {
                return page?.isProtected ? (
                    <ProtectedRoute
                        key={index}
                        exact
                        {...page}
                        state={{ pageName: page.menu }}
                    />
                ) : (
                    <Route
                        key={index}
                        exact
                        {...page}
                        state={{ pageName: page.menu }}
                    />
                );
            })}
            <ProtectedRoute path="*" exact={true} component={_404NotFound} />
        </Switch>
    );
}
