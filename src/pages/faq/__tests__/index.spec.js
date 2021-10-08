import React from "react";
import Faq from "../faq";
import { render, screen } from "@testing-library/react";
import { FaqsResponse } from "../__mocks__/";
import { Provider } from "react-redux";
import store from "../../../store";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter as Router } from "react-router-dom";

const server = setupServer(
    rest.get("/faqs", (req, res, ctx) => {
        return res(ctx.json({ data: FaqsResponse }));
    })
);
describe("Faq Component", () => {
    render(
        <Provider store={store}>
            <Router>
                <Faq />
            </Router>
        </Provider>
    );

    it("should display faqs items", () => {
        expect(screen.getByTestId("all_faqs_items")).toBeInTheDocument();
    });
});
