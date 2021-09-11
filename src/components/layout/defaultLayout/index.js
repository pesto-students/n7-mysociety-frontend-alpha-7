import React from "react";
import Header from "../../blocks/header";
import Footer from "../../blocks/footer";
import { Container } from "@material-ui/core";
import "./defaultLayout.scss";

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Header />
            <Container maxWidth="lg" className="container">
                <div>{children}</div>
            </Container>
            <Footer />
        </>
    );
};

export default DefaultLayout;
