import React from "react";
import Header from "../../blocks/header";
import Footer from "../../blocks/footer";
import { Container } from "@material-ui/core";
import "./defaultLayout.scss";
import { FabMenu } from "../../../shared";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { links } from "../../../modals/page";
const DefaultLayout = ({ children }) => {
    const location = useLocation();
    const res = Object.entries(links).find(
        ([, item]) => location.pathname === item.path
    );
    console.log(res, "-------");

    return (
        <React.Fragment>
            <Helmet>
                <title>{res !== undefined ? res[1]?.menu : "MySociety"}</title>
            </Helmet>
            <Header />
            <Container maxWidth="lg" className="container mainContainer">
                <FabMenu isAdmin={true} />
                {children}
            </Container>
            <Footer />
        </React.Fragment>
    );
};

export default DefaultLayout;
