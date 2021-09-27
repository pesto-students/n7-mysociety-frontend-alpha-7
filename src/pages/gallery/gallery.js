import React, { useEffect } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { galleries } from "../../store/selectors/gallery.selector";
import {
    delGallery,
    getGallery
} from "../../store/dispatchers/gallery.dispatch";
import { loggedInUserSocietyDetails } from "../../store/selectors/authetication.selector";
import { IconButton, EditIcon, DeleteIcon, Typography } from "../../shared";
import "./gallery.scss";
import { openModal } from "../../store/dispatchers/modal.dispatch";
import { ModalTypes } from "../../modals/constant";
import PhotoItem from "./photoItem";
import { LightgalleryProvider } from "react-lightgallery";
const Gallery = () => {
    const getGalleryDetails = useSelector(galleries);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const dispatch = useDispatch();
    const param = {
        societyId: societyDetails?._id
    };
    useEffect(() => dispatch(getGallery(param)), []);

    const editGallery = (item) => {
        dispatch(openModal(ModalTypes.addGallery, "Edit Gallery", item));
    };

    const deleteGallery = (item) => {
        const payload = {
            _id: item._id,
            societyId: societyDetails?._id
        };
        dispatch(delGallery(payload));
    };

    const actions = (item) => {
        return (
            <div className="gallery-actions">
                <IconButton
                    aria-label="edit"
                    size="medium"
                    color="secondary"
                    onClick={() => editGallery(item)}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    ria-label="delete"
                    size="medium"
                    color="secondary"
                    onClick={() => deleteGallery(item)}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        );
    };

    const lightGalleryLibrary = (item) => {
        return (
            <div className="gallery">
                <div className="gallery-header">
                    <div className="gallery-title">
                        <Typography variant="h6" color="secondary">
                            {item.category}
                        </Typography>
                    </div>

                    {actions(item)}
                </div>

                <LightgalleryProvider>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap"
                        }}
                        className="gallery-images"
                    >
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
            <DefaultLayout>
                {getGalleryDetails?.map((item) => {
                    return lightGalleryLibrary(item);
                })}
            </DefaultLayout>
        </div>
    );
};

export default Gallery;
