import React from "react";
import { render, screen } from "@testing-library/react";
import EventCard from "../index";
import { Provider } from "react-redux";
import store from "../../../../store";
import { BrowserRouter as Router } from "react-router-dom";
describe("Event Card render test suite", () => {
    beforeEach(() => {
        const event = {
            _id: "615031cc0b5baed971cdfafc",
            title: " dfs dƒdsfsdvsd vsdvsdvdsv sdsd",
            desc:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            societyId: "614586a42f9921170261ed45",
            fromDateTime: "2021-10-07T08:39:00.000Z",
            toDateTime: "2021-10-08T09:39:00.000Z",
            venue: "sds defsd dsvsdfsd f",
            created_at: "2021-09-26T08:39:40.301Z",
            updated_at: "2021-10-06T04:55:27.215Z"
        };
        render(
            <Provider store={store}>
                <Router>
                    <EventCard event={event} />
                </Router>
            </Provider>
        );
    });

    it("should render event card", () => {
        expect(
            screen.getByText("dfs dƒdsfsdvsd vsdvsdvds...")
        ).toBeInTheDocument();
    });

    it("should display event image", () => {
        const imageNode = screen.getByTestId("event_image");
        expect(imageNode).toBeInTheDocument();
        expect(imageNode).toHaveStyle(
            "background-image: url(event_placeholder.svg)"
        );
    });

    it("should display from data and to date", () => {
        const fromDateNode = screen.getByText("Thu, Oct 07");
        const toDateNode = screen.getByText("Fri, Oct 08");
        expect(fromDateNode).toBeInTheDocument();
        expect(toDateNode).toBeInTheDocument();
    });

    it("should display description", () => {
        const descriptionNode = screen.getByTestId("event_description");
        expect(descriptionNode).toBeInTheDocument();
    });
    it("should display Add to calendar link", () => {
        expect(screen.getByText("Add To Calendar")).toBeInTheDocument();
    });
    it("add to calender should have correct href value", () => {
        expect(
            screen.getByText("Add To Calendar").closest("a")
        ).toHaveAttribute(
            "href",
            "http://www.google.com/calendar/render?action=TEMPLATE&text=%20dfs%20d%C6%92dsfsdvsd%20vsdvsdvdsv%20sdsd&dates=20211007T083900Z%2F20211008T093900Z&details=Lorem%20Ipsum%20is%20simply%20dummy%20text%20of%20the%20printing%20and%20typesetting%20industry.%20Lorem%20Ipsum%20has%20been%20the%20industry's%20standard%20dummy%20text%20ever%20since%20the%201500s%2C%20when%20an%20unknown%20printer%20took%20a%20galley%20of%20type%20and%20scrambled%20it%20to%20make%20a%20type%20specimen%20book.%20It%20has%20survived%20not%20only%20five%20centuries%2C%20but%20also%20the%20leap%20into%20electronic%20typesetting%2C%20remaining%20essentially%20unchanged.%20It%20was%20popularised%20in%20the%201960s%20with%20the%20release%20of%20Letraset%20sheets%20containing%20Lorem%20Ipsum%20passages%2C%20and%20more%20recently%20with%20desktop%20publishing%20software%20like%20Aldus%20PageMaker%20including%20versions%20of%20Lorem%20Ipsum.&venue=sds%20defsd%20dsvsdfsd%20f&trp=false"
        );
    });

    it("should have view details button", () => {
        expect(screen.getByText("View Detail")).toBeInTheDocument();
    });
});

describe("Dashboard view", () => {
    beforeEach(() => {
        const event = {
            _id: "615031cc0b5baed971cdfafc",
            title: " dfs dƒdsfsdvsd vsdvsdvdsv sdsd",
            desc:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            societyId: "614586a42f9921170261ed45",
            fromDateTime: "2021-10-07T08:39:00.000Z",
            toDateTime: "2021-10-08T09:39:00.000Z",
            venue: "sds defsd dsvsdfsd f",
            created_at: "2021-09-26T08:39:40.301Z",
            updated_at: "2021-10-06T04:55:27.215Z"
        };
        render(
            <Provider store={store}>
                <Router>
                    <EventCard event={event} isDashboardView={true} />
                </Router>
            </Provider>
        );
    });
    it("should not display description", () => {
        //expect.assertions(1);

        try {
            expect(
                screen.getByTestId("event_description")
            ).not.toBeInTheDocument();
        } catch (error) {
            console.log(error);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toContain("Unable to find an element");
        }
    });
});
