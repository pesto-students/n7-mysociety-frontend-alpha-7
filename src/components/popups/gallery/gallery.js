import React, { useContext, useState, useEffect } from "react";
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
import S3FileUpload from "react-s3";
import { getConfig } from "../../../utils";
import { createGallery } from "../../../store/dispatchers/gallery.dispatch";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUserSocietyDetails } from "../../../store/selectors/authetication.selector";
import { isAddingGallery } from "../../../store/selectors/gallery.selector";
export default function GalleryPopup({ item }) {
    const gallery = item;
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const dispatch = useDispatch();
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const [uploading, setUploading] = useState(false);
    const isCreatingGallery = useSelector(isAddingGallery);

    const [newUploads, setNewUploads] = useState([]);

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

    useEffect(() => {
        console.log(newUploads);
    }, [newUploads]);

    const upload = (e) => {
        const images = [];
        setUploading(true);
        for (const file of e.target.files) {
            images.push(URL.createObjectURL(file));
        }
        setNewUploads([...newUploads, ...e.target.files]);

        updateForm({
            target: {
                id: "images",
                value: [...galleryForm.images.value, ...images]
            }
        });
        setUploading(false);
    };

    const deleteImage = (img) => {
        console.log(galleryForm.category.value);
        S3FileUpload.deleteFile(
            img.substring(img.lastIndexOf("/") + 1),
            getConfig("gallery")
        )
            .then((data) => {
                console.log(data);
                updateForm({
                    target: {
                        id: "images",
                        value: [
                            ...galleryForm.images.value.filter(
                                (imgsrc) => imgsrc !== img
                            )
                        ]
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const saveGallery = () => {
        const formData = new FormData();
        formData.append("images", newUploads);
        let payload = {
            societyId: societyDetails._id,
            images: galleryForm.images.value,
            category: galleryForm.category.value,
            newImages: formData
        };
        if (galleryForm?._id?.value) {
            payload = {
                ...payload,
                _id: galleryForm._id.value
            };
        }
        console.log(galleryForm.images);
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
