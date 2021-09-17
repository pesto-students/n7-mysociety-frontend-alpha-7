import React, { useContext } from "react";
import { FormControl, TextField, Button } from "../../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../../contexts/variant.context";
import { useFormGroup } from "../../../hooks";
import "./announcement.scss";
export default function AnnocumentPopup({ item }) {
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);

    const [annoucementForm, updateAnnouncementForm] = useFormGroup({
        title: item?.title ?? "",
        description: item?.description ?? ""
    });

    const title = (
        <div className="title-input">
            <FormControl>
                <TextField
                    label="Title"
                    id="title"
                    value={annoucementForm.title}
                    onChange={updateAnnouncementForm}
                    variant={inputVarient}
                ></TextField>
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
                    value={annoucementForm.description}
                    onChange={updateAnnouncementForm}
                    variant={inputVarient}
                ></TextField>
            </FormControl>
        </div>
    );

    const saveButton = (
        <div className="action-btn">
            <Button variant={buttonVarient} color="primary">
                Save
            </Button>
        </div>
    );

    return (
        <div className="annocement-modal-content">
            {title}
            {description}
            {saveButton}
        </div>
    );
}
