import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
test("renders learn react link", () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    const linkElement = screen.getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
});
