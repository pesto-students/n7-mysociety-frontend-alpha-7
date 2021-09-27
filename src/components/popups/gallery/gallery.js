import React, { useContext, useState } from "react";
import { useFormGroup } from "../../../hooks";
import {
    AddIcon,
    FormControl,
    //Select,
    //MenuItem,
    //InputLabel,
    TextField,
    Button,
    SpinnerLoader,
    IconButton,
    DeleteIcon
} from "../../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../../contexts/variant.context";
import "./gallery.scss";
import { createGallery } from "../../../store/dispatchers/gallery.dispatch";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUserSocietyDetails } from "../../../store/selectors/authetication.selector";
import { isAddingGallery } from "../../../store/selectors/gallery.selector";
import uploadService from "../../../services/upload";
export default function GalleryPopup({ item }) {
    const gallery = item;
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const dispatch = useDispatch();
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const [uploading, setUploading] = useState(false);
    const isCreatingGallery = useSelector(isAddingGallery);

    const [galleryForm, updateForm] = useFormGroup({
        images: {
            value: gallery?.images ?? [],
            validation: { required: true }
        },
        category: {
            value: gallery?.category ?? "",
            validation: { required: true }
        },
        _id: {
            value: gallery?._id ?? null
        }
    });

    const upload = (e) => {
        let images = [];
        setUploading(true);
        const formData = new FormData();
        Array.from(e.target.files).forEach((file) => {
            formData.append("image", file);
        });

        uploadService
            .uploadImages(formData)
            .then((response) => {
                console.log(response);
                images = response?.data?.imageUrls ?? [];
                updateForm({
                    target: {
                        id: "images",
                        value: [...galleryForm.images.value, ...images]
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            });

        setUploading(false);
    };

    const deleteImage = (img) => {};

    const saveGallery = () => {
        let payload = {
            societyId: societyDetails._id,
            images: galleryForm.images.value,
            category: galleryForm.category.value
        };
        if (galleryForm?._id?.value) {
            payload = {
                ...payload,
                _id: galleryForm._id.value
            };
        }
        dispatch(createGallery(payload));
    };

    const addMoreContainer = (
        <div className="add-more-images">
            <input
                type="file"
                style={{ display: "none" }}
                id="file-uploader"
                onChange={upload}
                multiple
            />
            <label htmlFor="file-uploader">
                <AddIcon />
            </label>
        </div>
    );

    const uploadImageBoxes = (
        <div
            className="uploaded-images"
            style={
                !galleryForm.category.value
                    ? { pointerEvents: "none", opacity: "0.5" }
                    : null
            }
        >
            <SpinnerLoader show={uploading}>
                <div className="images">
                    {galleryForm.images?.value.map((image, index) => {
                        return (
                            <div
                                className="image-box"
                                key={index}
                                // style={{ backgroundImage: `url(${image.url})` }}
                            >
                                <img src={image} alt="event" />
                                <IconButton onClick={() => deleteImage(image)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        );
                    })}
                </div>
            </SpinnerLoader>
            {addMoreContainer}
        </div>
    );

    const saveButton = (
        <div className="action-btn">
            <Button
                variant={buttonVarient}
                color="primary"
                onClick={() => saveGallery()}
            >
                save
            </Button>
        </div>
    );

    const eventSelector = (
        <div className="event-selector">
            <FormControl>
                <TextField
                    required
                    label="Gallery Name"
                    id="category"
                    value={galleryForm.category.value}
                    onChange={updateForm}
                    variant={inputVarient}
                    helperText={galleryForm.category.errorMessage}
                ></TextField>
            </FormControl>
        </div>
    );

    // const eventSelector = (
    //     <div className="event-selector">
    //         <FormControl>
    //             <InputLabel id="galleryEventTitle_label">Event</InputLabel>
    //             <Select
    //                 id="galleryEventTitle"
    //                 label="Priority"
    //                 value={galleryForm.galleryEventTitle}
    //                 onChange={updateForm}
    //                 variant={inputVarient}
    //             >
    //                 {events.map((event, index) => {
    //                     return (
    //                         <MenuItem value={event.id} key={index}>
    //                             {event.title}
    //                         </MenuItem>
    //                     );
    //                 })}
    //             </Select>
    //         </FormControl>
    //     </div>
    // );

    return (
        <SpinnerLoader show={isCreatingGallery} fullScreen={true}>
            <div className="modal-gallery-content">
                {eventSelector}
                {uploadImageBoxes}
                {saveButton}
            </div>
        </SpinnerLoader>
    );
}
