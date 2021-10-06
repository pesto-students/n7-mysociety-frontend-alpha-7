import React, { useEffect } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { useSelector, useDispatch } from "react-redux";
import {
    galleries,
    isGalleryLoading,
    isDeletingGallery
} from "../../store/selectors/gallery.selector";
import {
    delGallery,
    getGallery
} from "../../store/dispatchers/gallery.dispatch";
import {
    loggedInUserSocietyDetails,
    isLoggedInAsAdmin
} from "../../store/selectors/authetication.selector";
import {
    IconButton,
    EditIcon,
    DeleteIcon,
    Typography,
    SpinnerLoader
} from "../../shared";
import "./gallery.scss";
import { openModal } from "../../store/dispatchers/modal.dispatch";
import { ModalTypes } from "../../modals/constant";
import PhotoItem from "./photoItem";
import { LightgalleryProvider } from "react-lightgallery";
import * as moment from "moment";
const Gallery = () => {
    const getGalleryDetails = useSelector(galleries);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const isAdmin = useSelector(isLoggedInAsAdmin);
    const isLoadingGallery = useSelector(isGalleryLoading);
    const deletingGallery = useSelector(isDeletingGallery);
    const dispatch = useDispatch();
    const param = {
        societyId: societyDetails?._id
    };
    useEffect(() => {
        if (societyDetails?._id) {
            dispatch(getGallery(param));
        }
    }, [societyDetails]);

    const editGallery = (item) => {
        dispatch(openModal(ModalTypes.addGallery, "Edit Gallery", item));
    };

    const deleteGallery = (item) => {
        const payload = {
            _id: item._id,
            societyId: societyDetails?._id
        };
        dispatch(delGallery({ payload, images: item.images }));
    };

    const actions = (item) => {
        return [
            <IconButton
                aria-label="edit"
                size="medium"
                color="secondary"
                onClick={() => editGallery(item)}
                key="edit"
            >
                <EditIcon />
            </IconButton>,
            <IconButton
                ria-label="delete"
                size="medium"
                color="secondary"
                onClick={() => deleteGallery(item)}
                key="delete"
            >
                <DeleteIcon />
            </IconButton>
        ];
    };

    const lightGalleryLibrary = (item) => {
        return (
            <div className="gallery">
                <div className="gallery-header">
                    <div className="gallery-title">
                        <div>
                            <Typography variant="h6" color="secondary">
                                {item.category}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                component="p"
                                className="lib-date"
                            >
                                {moment(item.updated_at).format(
                                    "YYYY-MM-DD h:m A"
                                )}
                            </Typography>
                        </div>
                        <div>{isAdmin ? actions(item) : null}</div>
                    </div>
                </div>

                <LightgalleryProvider>
                    <div className="gallery-images">
                        {item.images.map((p, idx) => (
                            <PhotoItem
                                key={idx}
                                image={p}
                                thumb={p}
                                group={item.category}
                            />
                        ))}
                    </div>
                </LightgalleryProvider>
            </div>
        );
    };

    return (
        <div className="wrapper">
            <DefaultLayout
                show={isLoadingGallery || deletingGallery}
                fullScreen={true}
            >
                <SpinnerLoader>
                    {getGalleryDetails?.length > 0 ? (
                        getGalleryDetails?.map((item) => {
                            return lightGalleryLibrary(item);
                        })
                    ) : (
                        <div className="no-record-message">
                            <Typography variant="h3" color="primary">
                                No records found
                            </Typography>
                        </div>
                    )}
                </SpinnerLoader>
            </DefaultLayout>
        </div>
    );
};

export default Gallery;
