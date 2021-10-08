import React, { useState, useContext, useEffect } from "react";
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    SpinnerLoader
} from "../../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../../contexts/variant.context";
import { useFormGroup } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { saveComplaint } from "../../../store/dispatchers/complaint.dispatch";
import { Validator, formatDate } from "../../../utils";
import { loggedInUserSocietyDetails } from "../../../store/selectors/authetication.selector";
import {
    isComplaintSaving,
    currentFilter
} from "../../../store/selectors/complaint.selector";
import { modalType } from "../../../store/selectors/modal.selector";
import "./complain.scss";
import { ModalTypes } from "../../../modals/constant";
import { isLoggedInAsAdmin } from "../../../store/selectors/authetication.selector";
import "./complain.scss";
import { Typography } from "@material-ui/core";
function ComplainPopup({ item }) {
    console.log(item, "item---");
    const dispatch = useDispatch();
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const savingComplaint = useSelector(isComplaintSaving);
    const modal = useSelector(modalType);
    const viewOnly = modal === ModalTypes.complaint;
    const isAdmin = useSelector(isLoggedInAsAdmin);
    console.log(isAdmin, "isAdmin");
    console.log(viewOnly, "viewOnly");
    const formGroup = {
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
        priority: {
            value: item?.priority ?? "",
            validation: {
                required: true,
                msgs: {
                    required: "Priority should be selected."
                }
            }
        },
        _id: { value: item?._id ?? 0 }
    };
    if (isAdmin) {
        formGroup.comment = {
            value: item?.comment ?? "",
            validation: {
                required: true,
                //minLength: 50,

                msgs: {
                    required: "Comment is required"
                    //minLength: "minlength should be 50"
                }
            }
        };
        formGroup.status = {
            value: item?.status ?? "",
            validation: {
                required: true,
                msgs: {
                    required: "Status should be selected."
                }
            }
        };
    }
    const [complaintForm, updateForm] = useFormGroup(formGroup);

    const [priorities, setPriorties] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        setPriorties(["Low", "Medium", "High"]);
        setStatuses(["Pending", "Resolved", "Reject"]);
    }, []);

    const isComplaintValid = Validator.isFormValid(complaintForm);
    const currentStatus = useSelector(currentFilter);
    const save = () => {
        let payload = {
            title: complaintForm.title.value,
            desc: complaintForm.desc.value,
            priority: complaintForm.priority.value,
            societyId: societyDetails._id
        };
        if (isAdmin) {
            payload.comment = complaintForm.comment.value;
            payload.status = complaintForm.status.value;
        }

        if (complaintForm?._id?.value) {
            payload = {
                ...payload,
                _id: complaintForm._id.value
            };
        }

        dispatch(saveComplaint(payload, currentStatus, societyDetails._id));
    };

    const complaintTitleFormControl = () => {
        return (
            <FormControl>
                <TextField
                    label="Complain Title"
                    id="title"
                    value={complaintForm.title.value}
                    onChange={updateForm}
                    variant={inputVarient}
                    required
                    disabled={isAdmin || viewOnly}
                ></TextField>
            </FormControl>
        );
    };

    const complaintDescriptionFormControl = () => {
        return (
            <FormControl>
                <TextField
                    id="desc"
                    label="Description"
                    multiline
                    maxRows={4}
                    minRows={4}
                    value={complaintForm.desc.value}
                    onChange={updateForm}
                    variant={inputVarient}
                    helperText={complaintForm.desc.errorMessage}
                    required
                    disabled={isAdmin || viewOnly}
                />
            </FormControl>
        );
    };
    const complaintCommentFormControl = () => {
        return (
            <FormControl>
                <TextField
                    id="comment"
                    label="Comment"
                    multiline
                    maxRows={4}
                    minRows={4}
                    value={complaintForm.comment.value}
                    onChange={updateForm}
                    variant={inputVarient}
                    helperText={complaintForm.comment.errorMessage}
                    required
                />
            </FormControl>
        );
    };
    const complaintStatusFormControl = () => {
        return (
            <FormControl>
                <InputLabel id="status">Status</InputLabel>
                <Select
                    id="status"
                    name="status"
                    label="Status"
                    value={complaintForm.status.value}
                    onChange={updateForm}
                    variant={inputVarient}
                >
                    {statuses.map((status, index) => {
                        return (
                            <MenuItem value={status} key={index}>
                                {status}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        );
    };
    const complaintPriorityFormControl = () => {
        return (
            <FormControl>
                <InputLabel id="priority">Priority</InputLabel>
                <Select
                    id="priority"
                    name="priority"
                    label="Priority"
                    value={complaintForm.priority.value}
                    onChange={updateForm}
                    variant={inputVarient}
                    disabled={isAdmin || viewOnly}
                >
                    {priorities.map((priority, index) => {
                        return (
                            <MenuItem value={priority} key={index}>
                                {priority}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        );
    };

    const pastComments = () => {
        return (
            <FormControl>
                <Typography variant="subtitle1" color="secondary">
                    {isAdmin ? "Pasts Comments" : "Admin Comments"}
                </Typography>
                {item.comments.map((comment, index) => {
                    console.log(comment, "comment");
                    return (
                        <div key={index} className="commentDateWrap">
                            <Typography variant="subtitle1" className="comment">
                                {comment.comment}
                            </Typography>
                            <Typography variant="subtitle2" className="date">
                                {formatDate(
                                    comment.time,
                                    "DD-MM-YYYY h:mm:ss A"
                                )}
                            </Typography>
                        </div>
                    );
                })}
            </FormControl>
        );
    };

    const actionBtns = () => {
        return (
            <div className="action-btn">
                <Button
                    variant={buttonVarient}
                    color="primary"
                    onClick={() => save()}
                    disabled={!isComplaintValid}
                >
                    Save
                </Button>
            </div>
        );
    };

    return (
        <SpinnerLoader show={savingComplaint} fullScreen={true}>
            <div className="complain">
                {complaintTitleFormControl()}
                {complaintDescriptionFormControl()}
                {complaintPriorityFormControl()}
                {item?.comments.length > 0 && pastComments()}
                {isAdmin && complaintCommentFormControl()}
                {isAdmin && complaintStatusFormControl()}
                {actionBtns()}
            </div>
        </SpinnerLoader>
    );
}

export default ComplainPopup;
