import { ActionStatus } from "../../models/constant";
export const isRegistered = (state) =>
  state.authentication.register === ActionStatus.success;

export const isLoggedIn = (state) =>
  state.authentication.login === ActionStatus.success;
