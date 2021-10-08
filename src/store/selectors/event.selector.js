import { ActionStatus } from "../../modals/constant";
import { getPager } from "../../utils";
export const isEventLoading = (state) =>
    state.event.events.status === ActionStatus.busy;
export const allEvents = (state) => state.event.events.data;

export const pager = (state) => {
    const details = allEvents(state);

    return getPager(details);
};

export const isAdding = (state) =>
    state.event.lastAdded.status === ActionStatus.busy;

export const isDeleting = (state) =>
    state.event.lastDeleted.status === ActionStatus.busy;

export const currentFilter = (state) => state.event?.events.currentFilter;
