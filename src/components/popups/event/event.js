import React, { useContext } from "react";
import { useFormGroup } from "../../../hooks";
import { FormControl, TextField, Button } from "../../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../../contexts/variant.context";
import "./event.scss";
export default function EventPopup({ event }) {
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const [eventForm, updateForm] = useFormGroup({
        title: event?.title ?? "",
        description: event?.description ?? "",
        fromDateTime: event?.fromDateTime ?? "",
        toDateTime: event?.toDateTime ?? "",
        image: event?.image ?? ""
    });

    const title = (
        <div className="title-input">
            <FormControl>
                <TextField
                    label="Title"
                    id="title"
                    value={eventForm.title}
                    onChange={updateForm}
                    variant={inputVarient}
                ></TextField>
            </FormControl>
        </div>
    );
    const fromDateTime = (
        <div className="from-date-time-input">
            <FormControl>
                <TextField
                    id="fromDateTime"
                    label="From DateTime"
                    type="datetime-local"
                    value={eventForm.fromDateTime}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </FormControl>
        </div>
    );
    const toDateTime = (
        <div className="to-date-time-input">
            <FormControl>
                <TextField
                    id="toDateTime"
                    label="To DateTime"
                    type="datetime-local"
                    value={eventForm.toDateTime}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </FormControl>
        </div>
    );
    const description = (
        <div className="description-input">
            <FormControl>
                <TextField
                    label="Description"
                    id="description"
                    maxRows={4}
                    minRows={4}
                    multiline
                    value={eventForm.description}
                    onChange={updateForm}
                    variant={inputVarient}
                ></TextField>
            </FormControl>
        </div>
    );
    const image = (
        <div className="event-image-input">
            <div style={{ display: "none" }}>
                <FormControl>
                    <TextField
                        label="Image"
                        id="image"
                        value={eventForm.image}
                        type="file"
                        onChange={updateForm}
                        variant={inputVarient}
                    ></TextField>
                </FormControl>
            </div>
        </div>
    );

    const uploadImageButton = (
        <div className="action-btn  upload-btn">
            <Button variant="outlined" color="primary">
                <label htmlFor="image">upload</label>
            </Button>
        </div>
    );

    const saveButton = (
        <div className="action-btn">
            <Button variant={buttonVarient} color="primary">
                save
            </Button>
        </div>
    );

    const updateImage = (
        <div className="upload-image-input">
            <div className="image-preview">&nbsp;</div>
            {image}
            {uploadImageButton}
        </div>
    );

    return (
        <div className="event-model-content">
            <div>{updateImage}</div>
            <div>
                {title}
                {fromDateTime}
                {toDateTime}
                {description}
                {saveButton}
            </div>
        </div>
    );
}
