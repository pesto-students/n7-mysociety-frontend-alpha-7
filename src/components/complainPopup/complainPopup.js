import React, { useState, useContext, useEffect } from "react";
import {
    MsModal,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button
} from "../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../contexts/variant.context";
import { useFormGroup } from "../../hooks";
import "./complainPopup.scss";
function ComplainPopup() {
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const [complainForm, updateForm] = useFormGroup({
        complainTitle: "",
        complainDescription: "",
        complainPriority: ""
    });

    const [priorities, setPriorties] = useState([]);

    useEffect(() => {
        setPriorties([
            { title: "High", value: 1 },
            { title: "Medium", value: 2 },
            { title: "Low", value: 3 }
        ]);
    }, []);

    const complainTitleFormControl = () => {
        return (
            <FormControl>
                <TextField
                    label="Complain Title"
                    id="complainTitle"
                    value={complainForm.complainTitle}
                    onChange={updateForm}
                    variant={inputVarient}
                ></TextField>
            </FormControl>
        );
    };

    const complainDescriptionFormControl = () => {
        return (
            <FormControl>
                <TextField
                    id="complainDescription"
                    label="Description"
                    multiline
                    maxRows={4}
                    minRows={4}
                    value={complainForm.complainDescription}
                    onChange={updateForm}
                    variant={inputVarient}
                />
            </FormControl>
        );
    };

    const complainPriorityFormControl = () => {
        return (
            <FormControl>
                <InputLabel id="demo-simple-select-helper-label">
                    Priority
                </InputLabel>
                <Select
                    id="complainPriority"
                    label="Priority"
                    value={complainForm.complainPriority}
                    onChange={updateForm}
                    variant={inputVarient}
                >
                    {priorities.map((priority, index) => {
                        return (
                            <MenuItem value={priority.value} key={index}>
                                {priority.title}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        );
    };

    const actionBtns = () => {
        return (
            <div className="action-btn">
                <Button variant="outlined">Cancel</Button>
                <Button color="primary" variant={buttonVarient}>
                    Complain
                </Button>
            </div>
        );
    };

    return (
        <div className="complain">
            {complainTitleFormControl()}
            {complainDescriptionFormControl()}
            {complainPriorityFormControl()}
            {actionBtns()}
        </div>
    );
}

export default MsModal(ComplainPopup);
