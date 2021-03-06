import { ActionStatus } from "../../modals/constant";
import { getCookie } from "../../utils";
export const isRegistered = (state) =>
    state.authentication.register.status === ActionStatus.success;

export const isLoggedIn = (state) =>
    state.authentication.login.status === ActionStatus.success &&
    state.authentication.login.isLoggedIn === true;

export const isFetchingLoggedInUserDetails = (state) =>
    state.authentication?.login?.status === ActionStatus.busy;

export const isRegisteringUser = (state) =>
    state.authentication.register.status === ActionStatus.busy;

export const isRegisteredAsAdmin = (state) =>
    state.authentication?.register?.data?.role === "admin";

export const registeredUserDetails = (state) =>
    state.authentication?.register?.data;

export const loggedInUserDetails = (state) => state.authentication?.login?.data;

export const loggedInUserSocietyDetails = (state) =>
    state.authentication?.login?.data?.society;

export const isUserLogging = (state) =>
    state.authentication?.login?.status === ActionStatus.busy;

export const societies = (state) => state.authentication.societies.data;
export const guests = (state) => state.authentication.guests.data;

export const isLoggedInAsAdmin = (state) =>
    state.authentication?.login?.data?.role === "admin";

export const isForgetPasswordDone = (state) =>
    state.authentication.forgetPassword.status === ActionStatus.success;
export const isResetPasswordDone = (state) =>
    state.authentication.resetPassword.status === ActionStatus.success;

export const isSocietyVerificationDone = (state) =>
    state.authentication.verifySociety.status === ActionStatus.success;

export const isLoggedOut = (state) =>
    state.authentication.login.isLoggedIn === false &&
    !getCookie("x-auth-token");
