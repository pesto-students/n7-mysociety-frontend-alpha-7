import React, { useContext, useState } from "react";
import { useFormGroup } from "../../../hooks";
import { FormControl, TextField, Button, SpinnerLoader } from "../../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../../contexts/variant.context";
import { loggedInUserSocietyDetails } from "../../../store/selectors/authetication.selector";
import { addEvent } from "../../../store/dispatchers/event.dispatch";
import { useDispatch, useSelector } from "react-redux";
import "./event.scss";
import {
    dateTimeLocal,
    uploadToFireBaseStore,
    Validator
} from "../../../utils";
import {
    isAdding,
    currentFilter
} from "../../../store/selectors/event.selector";
import { modalType } from "../../../store/selectors/modal.selector";
import { ModalTypes } from "../../../modals/constant";
import uploadService from "../../../services/upload";
export default function EventPopup({ item }) {
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const dispatch = useDispatch();
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const loading = useSelector(isAdding);
    const modal = useSelector(modalType);
    const viewOnly = modal === ModalTypes.event;
    const event = item;
    const today = new Date();
    const [error, setError] = useState(null);
    const [uploadFromNode] = useState(false);
    const currentStatus = useSelector(currentFilter);
    const [eventForm, updateForm] = useFormGroup({
        title: {
            value: event?.title ?? "",
            validation: {
                required: true,
                msgs: { required: "Title is required" }
            }
        },
        venue: {
            value: event?.venue ?? "",
            validation: {
                required: true,
                msgs: {
                    required: "Venue is required"
                }
            }
        },
        desc: {
            value: event?.desc ?? "",
            validation: {
                required: true,
                msgs: { required: "Description is required" }
            }
        },
        fromDateTime: {
            value: event?.fromDateTime ? dateTimeLocal(event.fromDateTime) : "",
            validation: {
                required: true,
                minDate: today,
                msgs: {
                    required: "FromDateTime is required",
                    minDate: "fromdate cannot be less than today"
                }
            }
        },
        toDateTime: {
            value: event?.toDateTime ? dateTimeLocal(event.toDateTime) : "",
            validation: {
                required: true,
                msgs: { required: "ToDateTime is required" }
            }
        },
        img: {
            value: event?.img ?? ""
        },
        _id: { value: event?._id ?? "" }
    });

    const uploadUpfront = (e) => {
        uploadToFireBaseStore(e.target.files[0], "event")
            .then((response) => {
                updateForm({
                    target: { id: "img", value: response }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const uploadThroughNode = (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        uploadService
            .uploadImage(formData)
            .then((response) => {
                console.log(response);
                updateForm({
                    target: { id: "img", value: response.imageUrl }
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const upload = async (e) => {
        if (uploadFromNode) {
            uploadThroughNode(e);
        } else {
            uploadUpfront(e);
        }
    };

    const title = (
        <div className="title-input">
            <FormControl>
                <TextField
                    label="Title"
                    id="title"
                    value={eventForm.title.value}
                    onChange={updateForm}
                    variant={inputVarient}
                    disabled={viewOnly}
                    required
                ></TextField>
            </FormControl>
        </div>
    );
    console.log(today.toISOString());
    const fromDateTime = (
        <div className="from-date-time-input">
            <FormControl>
                <TextField
                    id="fromDateTime"
                    label="From DateTime"
                    type="datetime-local"
                    value={eventForm.fromDateTime.value}
                    onChange={updateForm}
                    disabled={viewOnly}
                    min={today.toISOString()}
                    helperText={eventForm.fromDateTime.errorMessage}
                    required
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
                    value={eventForm.toDateTime.value}
                    onChange={updateForm}
                    disabled={viewOnly}
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                />
            </FormControl>
        </div>
    );
    const description = (
        <div className="description-input">
            <FormControl>
                <TextField
                    label="Description"
                    id="desc"
                    maxRows={4}
                    minRows={4}
                    multiline
                    value={eventForm.desc.value}
                    onChange={updateForm}
                    variant={inputVarient}
                    disabled={viewOnly}
                    required
                ></TextField>
            </FormControl>
        </div>
    );
    const venue = (
        <div className="venue-input">
            <FormControl>
                <TextField
                    label="Venue"
                    id="venue"
                    value={eventForm.venue.value}
                    onChange={updateForm}
                    variant={inputVarient}
                    disabled={viewOnly}
                    required
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
                        id="img"
                        type="file"
                        accept="image/*"
                        onChange={upload}
                        variant={inputVarient}
                        disabled={viewOnly}
                    ></TextField>
                </FormControl>
            </div>
        </div>
    );

    const uploadImageButton = (
        <div className="action-btn  upload-btn">
            <Button variant="outlined" color="primary" disabled={viewOnly}>
                <label htmlFor="img">upload</label>
            </Button>
        </div>
    );

    const isEventFormValid = Validator.isFormValid(eventForm);

    const saveButton = (
        <div className="action-btn">
            <Button
                variant={buttonVarient}
                color="primary"
                disabled={!isEventFormValid}
                onClick={() => saveEvent()}
            >
                save
            </Button>
        </div>
    );

    const updateImage = (
        <div className="upload-image-input">
            <div
                className="image-preview"
                style={{
                    backgroundImage: `url(${eventForm.img?.value ?? ""})`
                }}
            >
                &nbsp;
            </div>
            {image}
            {uploadImageButton}
        </div>
    );

    const saveEvent = () => {
        if (
            new Date(eventForm.fromDateTime.value) >
            new Date(eventForm.toDateTime.value)
        ) {
            setError("fromdate should be less than to date");
            setTimeout(() => setError(null), 2000);
            return;
        }

        let payload = {
            title: eventForm.title.value,
            desc: eventForm.desc.value,
            fromDateTime: eventForm.fromDateTime.value,
            toDateTime: eventForm.toDateTime.value,
            venue: eventForm.venue.value,
            societyId: societyDetails?._id
        };
        if (!!eventForm.img.value) {
            payload.img = eventForm.img.value;
        }
        if (eventForm._id?.value) {
            payload = {
                ...payload,
                _id: eventForm._id.value
            };
        }
        dispatch(addEvent(payload, currentStatus, societyDetails._id));
    };

    return (
        <SpinnerLoader show={loading} fullScreen={true}>
            <div className="event-model-content">
                <div>{updateImage}</div>
                <div>
                    {title}
                    {venue}
                    {fromDateTime}
                    {toDateTime}
                    {description}
                    {error ? (
                        <span style={{ color: "red" }}>{error}</span>
                    ) : null}
                    {!viewOnly ? saveButton : null}
                </div>
            </div>
        </SpinnerLoader>
    );
}
