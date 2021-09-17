import React, { useState, useContext } from "react";
import { useFormGroup } from "../../../hooks";
import {
    AddIcon,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    UserActions
} from "../../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../../contexts/variant.context";
import "./gallery.scss";
export default function GalleryPopup({ gallery }) {
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);

    const [galleryForm, updateForm] = useFormGroup({
        galleryImages: gallery?.galleryImages ?? [],
        galleryEventTitle: gallery?.galleryEventTitle ?? ""
    });
    console.log(buttonVarient);

    const [images] = useState([
        {
            id: 1,
            url: "https://picsum.photos/id/1/200/300"
        },
        {
            id: 2,
            url: "https://picsum.photos/id/2/200/300"
        },
        {
            id: 3,
            url: "https://picsum.photos/id/2/200/300"
        },
        {
            id: 4,
            url: "https://picsum.photos/id/3/200/300"
        },
        {
            id: 3,
            url: "https://picsum.photos/id/2/200/300"
        },
        {
            id: 4,
            url: "https://picsum.photos/id/3/200/300"
        }
    ]);

    const [events] = useState([
        { id: 1, title: "Christmax" },
        { id: 2, title: "Diwali" }
    ]);

    const addMoreContainer = (
        <div className="add-more-images">
            <AddIcon />
        </div>
    );

    const uploadImageBoxes = (
        <div className="uploaded-images">
            <div className="images">
                {images.map((image, index) => {
                    return (
                        <div
                            className="image-box"
                            key={index}
                            // style={{ backgroundImage: `url(${image.url})` }}
                        >
                            <UserActions canDelete={true} />
                            <img src={image.url} alt="event" />
                        </div>
                    );
                })}
            </div>
            {addMoreContainer}
        </div>
    );

    const saveButton = (
        <div className="action-btn">
            <Button variant={buttonVarient} color="primary">
                save
            </Button>
        </div>
    );

    const eventSelector = (
        <div className="event-selector">
            <FormControl>
                <InputLabel id="galleryEventTitle_label">Event</InputLabel>
                <Select
                    id="galleryEventTitle"
                    label="Priority"
                    value={galleryForm.galleryEventTitle}
                    onChange={updateForm}
                    variant={inputVarient}
                >
                    {events.map((event, index) => {
                        return (
                            <MenuItem value={event.id} key={index}>
                                {event.title}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );

    return (
        <div className="modal-gallery-content">
            {uploadImageBoxes}
            {eventSelector}
            {saveButton}
        </div>
    );
}
