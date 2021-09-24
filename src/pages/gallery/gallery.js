import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/layout/defaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { galleries } from "../../store/selectors/gallery.selector";
import {
    delGallery,
    getGallery
} from "../../store/dispatchers/gallery.dispatch";
import { loggedInUserSocietyDetails } from "../../store/selectors/authetication.selector";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    IconButton,
    EditIcon,
    DeleteIcon
} from "../../shared";
import "./gallery.scss";
import { openModal } from "../../store/dispatchers/modal.dispatch";
import { ModalTypes } from "../../modals/constant";
const Gallery = () => {
    const size = {
        minWidth: 276,
        maxWidth: 450
    };
    const getGalleryDetails = useSelector(galleries);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const dispatch = useDispatch();
    const param = {
        societyId: societyDetails._id
    };
    useEffect(() => dispatch(getGallery(param)), []);
    const [showAccordian] = useState(false);
    const randomWidth = () => {
        return Math.random() * (size.maxWidth - size.minWidth) + size.minWidth;
    };

    const editGallery = (item) => {
        dispatch(openModal(ModalTypes.addGallery, "Edit Gallery", item));
    };

    const deleteGallery = (item) => {
        const payload = {
            _id: item._id,
            societyId: societyDetails._id
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

    const images = (item) => {
        return (
            <div className="gallery-images">
                {item.images.map((img, index) => (
                    <img
                        src={img}
                        key={index}
                        style={{ width: randomWidth() }}
                    />
                ))}
            </div>
        );
    };

    const displayGallery = (item, key) => {
        return (
            <Accordion key={item._id} className="gallery">
                <AccordionSummary>
                    <Typography variant="subtitle1" color="primary">
                        {item.category}
                    </Typography>
                    {actions(item)}
                </AccordionSummary>
                <AccordionDetails>{images(item)}</AccordionDetails>
            </Accordion>
        );
    };

    const displayPlainGallery = (item) => {
        return (
            <div className="gallery">
                <div className="gallery-header">
                    <div className="gallery-title">
                        <Typography variant="subtitle1" color="secondary">
                            {item.category}
                        </Typography>
                    </div>

                    {actions(item)}
                </div>

                {images(item)}
            </div>
        );
    };

    return (
        <div className="wrapper">
            <DefaultLayout>
                {getGalleryDetails?.map((item) => {
                    return showAccordian
                        ? displayGallery(item)
                        : displayPlainGallery(item);
                })}
            </DefaultLayout>
        </div>
    );
};

export default Gallery;
