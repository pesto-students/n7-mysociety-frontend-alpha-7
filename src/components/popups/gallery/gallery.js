import React, { useContext, useEffect, useState } from "react";
import { useFormGroup } from "../../../hooks";
import {
    FormControl,
    //Select,
    //MenuItem,
    //InputLabel,
    TextField,
    Button,
    SpinnerLoader,
    IconButton,
    DeleteIcon,
    DragAndDrop,
    CloudUploadIcon,
    Typography
} from "../../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../../contexts/variant.context";
import "./gallery.scss";
import { createGallery } from "../../../store/dispatchers/gallery.dispatch";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUserSocietyDetails } from "../../../store/selectors/authetication.selector";
import {
    isAddingGallery,
    isGalleryAddedOrUpdatedSuccessFully
} from "../../../store/selectors/gallery.selector";
import uploadService from "../../../services/upload";
import {
    uploadToFireBaseStore,
    deleteFileFromFireBaseStore
} from "../../../utils";
import * as MODAL_ACTION from "../../../store/actions/modal.action";
export default function GalleryPopup({ item }) {
    const gallery = item;
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const dispatch = useDispatch();
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const isGalerySavedSuccessFully = useSelector(
        isGalleryAddedOrUpdatedSuccessFully
    );
    const [uploading, setUploading] = useState(false);
    const isCreatingGallery = useSelector(isAddingGallery);
    const [uploadFromNode] = useState(false);
    const [deletedFiles, setDeletedFiles] = useState([]);
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
        if (isGalerySavedSuccessFully) {
            if (deletedFiles && deletedFiles.length > 0) {
                const images = deletedFiles.map((file) => {
                    return deleteFileFromFireBaseStore(file);
                });
                Promise.allSettled(images).then((result) => {
                    const deletedImageResponse = result
                        .filter(
                            (p) =>
                                p.status === "fulfilled" &&
                                !(p.value instanceof Error)
                        )
                        .map((p) => p.value);
                    console.log(deletedImageResponse);
                });
            }
            dispatch({ type: MODAL_ACTION.CLOSE_MODAL });
        }
    }, [isGalerySavedSuccessFully]);

    const uploadThroughNode = (e) => {
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

    const upload = (e) => {
        if (uploadFromNode) {
            uploadThroughNode(e);
        } else {
            uploaUpFront(e);
        }
    };

    const uploaUpFront = async (e) => {
        const images = Array.from(e.target.files).map((file) =>
            uploadToFireBaseStore(file, societyDetails._id)
        );
        Promise.allSettled(images).then((result) => {
            const uploadedImagesResponse = result
                .filter(
                    (p) =>
                        p.status === "fulfilled" && !(p.value instanceof Error)
                )
                .map((p) => p.value);
            console.log(uploadedImagesResponse);
            updateForm({
                target: {
                    id: "images",
                    value: [
                        ...galleryForm.images.value,
                        ...uploadedImagesResponse
                    ]
                }
            });
        });
    };

    const deleteImage = (img) => {
        const fileName = img.substring(img.lastIndexOf("/") + 1);
        console.log(fileName);
        const updatedFiles = galleryForm.images?.value?.filter(
            (image) => image !== img
        );
        updateForm({
            target: { id: "images", value: updatedFiles }
        });
        setDeletedFiles([...deletedFiles, img]);

        // S3UploadFile.deleteFile(fileName, config("gallery"))
        //     .then((response) => {
        //         updateForm({ target: { id: "images", value: updatedFiles } });
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };

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

    const uploadDroppedFiles = (files) => {
        console.log(files);
        uploaUpFront({ target: { files } });
    };

    const uploadBtn = (
        <React.Fragment className="upload-btn">
            <input
                type="file"
                style={{ display: "none" }}
                id="file-uploader"
                onChange={upload}
                accept="image/*"
                multiple
            />
            <Button variant={buttonVarient} color="primary">
                <label htmlFor="file-uploader">
                    Upload
                    <CloudUploadIcon />
                </label>
            </Button>
        </React.Fragment>
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
            <SpinnerLoader show={uploading} fullScreen={true}>
                <DragAndDrop
                    getDroppedFiles={(files) => uploadDroppedFiles(files)}
                >
                    {galleryForm?.images?.value?.length > 0 ? (
                        <div className="images">
                            {galleryForm.images?.value.map((image, index) => {
                                return (
                                    <div
                                        className="image-box"
                                        key={index}
                                        // style={{ backgroundImage: `url(${image.url})` }}
                                    >
                                        <img src={image} alt="event" />
                                        <IconButton
                                            onClick={() => deleteImage(image)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <Typography variant="subtitle" color="primary">
                            Drag and Drop files here
                        </Typography>
                    )}
                </DragAndDrop>
            </SpinnerLoader>
            {/* {addMoreContainer} */}
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
            {uploadBtn}
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
