import { isLoggedIn } from "../authetication.selector";
import { globalStore } from "../../__mocks__";
import { fetchingUser, errorInFetchingUser } from "../user.selector";
import { ActionStatus } from "../../../modals/constant";

describe("authentication selectors", () => {
    it("isLoggedIn shoud return true if user is logged in", () => {
        const isLogged = isLoggedIn(globalStore);
        expect(isLogged).toBe(true);
    });

    it("isLoggedIn should return false is user is not logged in", () => {
        const isLogged = isLoggedIn({
            ...globalStore,
            authentication: {
                ...globalStore.authentication,
                login: {
                    ...globalStore.authentication.login,
                    isLoggedIn: false
                }
            }
        });
        expect(isLogged).toBe(false);
    });

    it("fetching user should return false if user details are fetched", () => {
        const fetchingUserDetails = fetchingUser(globalStore);
        expect(fetchingUserDetails).toBeFalsy();
    });
    it("fetching user should return true if user details are fetching", () => {
        const fetchingUserDetails = fetchingUser({
            ...globalStore,
            user: {
                ...globalStore.user,
                userList: {
                    ...globalStore.user.userList,
                    status: ActionStatus.busy
                }
            }
        });
        expect(fetchingUserDetails).toBeTruthy();
    });

    it("errorInFetchingUser should return false if no error in fetching user details", () => {
        const userError = errorInFetchingUser(globalStore);
        expect(userError).toBeFalsy();
    });
    it("errorInFetchingUser should return true if error in fetching user details", () => {
        const userError = errorInFetchingUser({
            ...globalStore,
            user: {
                ...globalStore.user,
                userList: {
                    ...globalStore.user.userList,
                    status: ActionStatus.error
                }
            }
        });
        expect(userError).toBeTruthy();
    });
});
