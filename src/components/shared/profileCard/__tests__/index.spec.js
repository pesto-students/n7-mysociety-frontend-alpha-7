import React from "react";
import { render } from "@testing-library/react";
import ProfileCard from "../index";
import { Provider } from "react-redux";
import store from "../../../../store";
describe("ProfileCard render test suite", () => {
    test("ProfileCard should render", () => {
        const content = {
            _id: "615340cca796a348cd52ba6e",
            firstName: "Member",
            lastName: "Six",
            email: "membersix@gmail.com",
            mobile: "1231231231",
            societyId: "614586a42f9921170261ed45",
            flatNo: "A - 201",
            role: "member",
            password:
                "$2a$08$rT2IxSB0QGa4WtgIRrlJq.hiMKxozM9BZH2aJqZMFv1x80HiFUnz6",
            isConfirmed: false,
            isActive: true,
            created_at: "2021-09-28T16:20:28.383Z",
            updated_at: "2021-09-28T16:20:28.383Z"
        };
        const { getByRole } = render(
            <Provider store={store}>
                <ProfileCard content={content} />
            </Provider>
        );
        expect(getByRole("heading", { name: "Member Six" })).toBeTruthy();
    });
});
