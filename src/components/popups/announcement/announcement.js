import React, { useContext } from "react";
import { FormControl, TextField, Button, SpinnerLoader } from "../../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../../contexts/variant.context";
import { useFormGroup } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { saveAnnouncement } from "../../../store/dispatchers/announcement.dispatch";
import { Validator } from "../../../utils";
import { loggedInUserSocietyDetails } from "../../../store/selectors/authetication.selector";
import { isAnnouncementSaving } from "../../../store/selectors/announcement.selector";
import { modalType } from "../../../store/selectors/modal.selector";
import "./announcement.scss";
import { ModalTypes } from "../../../modals/constant";
export default function AnnocumentPopup({ item }) {
    const dispatch = useDispatch();
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const savingAnnouncement = useSelector(isAnnouncementSaving);
    const modal = useSelector(modalType);
    const viewOnly = modal === ModalTypes.announcement;

    const [annoucementForm, updateAnnouncementForm] = useFormGroup({
        title: {
            value: item?.title ?? "",
            validation: {
                required: true,
                msgs: {
                    required: "title required"
                }
            }
        },
        desc: {
            value: item?.desc ?? "",
            validation: {
                required: true,
                //minLength: 50,

                msgs: {
                    required: "description required"
                    //minLength: "minlength should be 50"
                }
            }
        },
        _id: { value: item?._id ?? 0 }
    });
    const isAnnouncementValid = Validator.isFormValid(annoucementForm);

    const title = (
        <div className="title-input">
            <FormControl>
                <TextField
                    label="Title"
                    id="title"
                    required
                    value={annoucementForm.title.value}
                    onChange={updateAnnouncementForm}
                    variant={inputVarient}
                    helperText={annoucementForm.title.errorMessage}
                    disabled={viewOnly}
                ></TextField>
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
                    value={annoucementForm.desc.value}
                    onChange={updateAnnouncementForm}
                    variant={inputVarient}
                    helperText={annoucementForm.desc.errorMessage}
                    disabled={viewOnly}
                    required
                ></TextField>
            </FormControl>
        </div>
    );

    const save = () => {
        let payload = {
            title: annoucementForm.title.value,
            desc: annoucementForm.desc.value,
            societyId: societyDetails._id
        };

        if (annoucementForm?._id?.value) {
            payload = {
                ...payload,
                _id: annoucementForm._id.value
            };
        }

        dispatch(saveAnnouncement(payload));
    };

    const saveButton = (
        <div className="action-btn">
            <Button
                variant={buttonVarient}
                color="primary"
                onClick={() => save()}
                disabled={!isAnnouncementValid}
            >
                Save
            </Button>
        </div>
    );
    return (
        <SpinnerLoader show={savingAnnouncement} fullScreen={true}>
            <div className="annocement-modal-content">
                {title}
                {description}
                {!viewOnly ? saveButton : null}
            </div>
        </SpinnerLoader>
    );
}
