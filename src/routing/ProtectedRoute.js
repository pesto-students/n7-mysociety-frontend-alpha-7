import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCookie } from "../utils";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (getCookie("x-auth-token")) {
                    return <Component {...rest} {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/user"
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;
