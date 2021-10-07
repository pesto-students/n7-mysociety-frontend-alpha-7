import AnnouncementCard from "../announcementCard";
import { Provider } from "react-redux";
import store from "../../../store";
import { BrowserRouter as Router } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import { Announcement } from "../__mocks__";
describe("AnnouncementCard", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <AnnouncementCard annoucement={Announcement} />
                </Router>
            </Provider>
        );
    });

    it("should render announcement card", () => {
        expect(screen.getByTestId("announcement_card")).toBeInTheDocument();
    });

    it("should have announcement title", () => {
        expect(screen.getByTestId("posted_on_date")).toBeInTheDocument();
    });

    it("should display description", () => {
        expect(
            screen.getByTestId("announcement_description")
        ).toBeInTheDocument();
    });

    it("should display posted on date", () => {
        expect(screen.getByTestId("posted_on_date")).toBeInTheDocument();
    });

    it("should display read more button", () => {
        expect(screen.getByTestId("read_more_btn")).toBeInTheDocument();
    });
});

describe("Dashboard view", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <AnnouncementCard
                        annoucement={Announcement}
                        isDashboard={true}
                    />
                </Router>
            </Provider>
        );
    });

    it("should not display description", () => {
        expect(
            screen.getByTestId("announcement_description")
        ).not.toBeInTheDocument();
    });
});
