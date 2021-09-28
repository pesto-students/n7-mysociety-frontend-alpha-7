import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCookie } from "../utils";
//import { useSelector } from "react-redux";
//import { loggedInUserSocietyDetails } from "../store/selectors/authetication.selector";
const ProtectedRoute = ({ component: Component, ...rest }) => {
    //const societyDetails = useSelector(loggedInUserSocietyDetails);
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
