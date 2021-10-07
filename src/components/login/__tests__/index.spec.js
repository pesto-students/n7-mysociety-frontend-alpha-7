import React from "react";
import Login from "../login";
import { Provider } from "react-redux";
import store from "../../../store";
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter as Router } from "react-router-dom";
describe("Login Component", () => {
    describe("should render Login component", () => {
        beforeEach(() => {
            render(
                <Provider store={store}>
                    <Router>
                        <Login />
                    </Router>
                </Provider>
            );
        });

        it("should display email id input", () => {
            expect(screen.getByTestId("email_id_input")).toBeInTheDocument();
        });

        it("should display password input", () => {
            expect(
                screen.getByTestId("user_password_input")
            ).toBeInTheDocument();
        });

        it("should display login button", () => {
            expect(screen.getByTestId("login_btn_div")).toBeInTheDocument();
        });

        it("should display login footer div", () => {
            expect(
                screen.getByTestId("login_box_footer_div")
            ).toBeInTheDocument();
        });

        it("should handle user inputs", () => {
            const emailNode = screen.getByTestId("email_input");

            const passwordNode = screen.getByTestId("password_input");

            const loginBtnNode = screen.getByTestId("login_btn");
            expect(loginBtnNode).toBeDisabled();

            expect(emailNode).toBeInTheDocument();
            expect(passwordNode).toBeInTheDocument();

            userEvent.type(emailNode, "admin@gmail.com");
            userEvent.type(passwordNode, "Password@1234");

            fireEvent.change(emailNode, { target: "admin@gmail.com" });
            fireEvent.change(passwordNode, {
                target: "Password@1234"
            });
        });
    });
});
