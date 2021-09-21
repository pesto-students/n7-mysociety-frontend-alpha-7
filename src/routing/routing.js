import React from "react";
import { Switch, Route } from "react-router-dom";
import { links } from "../modals/page";
export default function Routing() {
    return (
        <Switch>
            {links.map((page, index) => {
                return <Route key={index} exact {...page} />;
            })}
        </Switch>
    );
}
