import { ActionStatus } from "../../modals/constant";

export const galleries = (state) => state.gallery.gallery.data;
export const isGalleryLoading = (state) =>
    state.gallery.gallery.status === ActionStatus.busy;
export const isAddingGallery = (state) =>
    state.gallery.lastAdded.status === ActionStatus.busy;

export const isGalleryAddedOrUpdatedSuccessFully = (state) =>
    state.gallery.lastAdded.status === ActionStatus.success;

export const isDeleteGallerySuccessFully = (state) =>
    state.gallery.lastDeleted.status === ActionStatus.busy;

export const isDeletingGallery = (state) =>
    state.gallery.lastDeleted.status === ActionStatus.Busy;
