import React from "react";
import { Switch, Route } from "react-router-dom";
import { links } from "../modals/page";
export default function Routing() {
    return (
        <Switch>
            {links.map((page) => {
                return <Route key={page.menu} exact {...page} />;
            })}
        </Switch>
    );
}
