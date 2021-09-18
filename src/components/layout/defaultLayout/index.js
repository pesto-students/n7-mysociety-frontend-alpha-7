import React from "react";
import Header from "../../blocks/header";
import Footer from "../../blocks/footer";
import { Container } from "@material-ui/core";
import "./defaultLayout.scss";
import { FabMenu } from "../../../shared";

const DefaultLayout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <Container maxWidth="lg" className="container">
                <FabMenu isAdmin={true} />
                {children}
            </Container>
            <Footer />
        </React.Fragment>
    );
};

export default DefaultLayout;
