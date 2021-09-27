import { ActionStatus } from "../../modals/constant";

export const galleries = (state) => state.gallery.gallery.data;
export const isGalleryLoading = (state) =>
    state.gallery.gallery.status === ActionStatus.busy;
export const isAddingGallery = (state) =>
    state.gallery.lastAdded.status === ActionStatus.busy;
