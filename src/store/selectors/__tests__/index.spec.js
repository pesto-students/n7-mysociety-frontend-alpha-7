import { isLoggedIn } from "../authetication.selector";
import { globalStore } from "../../__mocks__";
describe("Selector  test suite", () => {
    it("isLoggedIn shoud return true if user is logged in", () => {
        const isLogged = isLoggedIn(globalStore);
        expect(isLogged).toBe(true);
    });
});
