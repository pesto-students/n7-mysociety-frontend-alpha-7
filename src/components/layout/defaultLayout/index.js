import React from "react";
import Header from "../../blocks/header/index";

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
};

export default DefaultLayout;
