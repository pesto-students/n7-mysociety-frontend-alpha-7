import React, { useContext } from "react";
import { TextField, FormControl, Button, SpinnerLoader } from "../../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../../contexts/variant.context";
import { useFormGroup } from "../../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../../../store/dispatchers/user.dispatch";
//import { Validator } from "../../../utils";
import { loggedInUserSocietyDetails } from "../../../store/selectors/authetication.selector";
import { isUserSaving } from "../../../store/selectors/user.selector";
import { modalType } from "../../../store/selectors/modal.selector";
import { ModalTypes } from "../../../modals/constant";
import { isLoggedInAsAdmin } from "../../../store/selectors/authetication.selector";
import "./user.scss";
import { Avatar, Typography } from "@material-ui/core";
import { getAvatarName } from "../../../helpers/functions";
function UserPopup({ item }) {
    console.log(item, "item---");
    const dispatch = useDispatch();
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const savingComplaint = useSelector(isUserSaving);
    const modal = useSelector(modalType);
    const viewOnly = modal === ModalTypes.complaint;
    const isAdmin = useSelector(isLoggedInAsAdmin);
    console.log(isAdmin, "isAdmin");
    console.log(viewOnly, "viewOnly");

    const userName = `${item?.firstName} ${item?.lastName}`;
    const formGroup = {
        _id: { value: item?._id ?? 0 }
    };
    const [userForm, updateForm] = useFormGroup(formGroup);

    const save = (status = null) => {
        let payload = {
            societyId: societyDetails._id
        };
        if (status !== null) {
            payload.status = status;
        }

        if (userForm?._id?.value) {
            payload = {
                ...payload,
                _id: userForm._id.value
            };
        }

        dispatch(saveUser(payload));
    };

    const actionBtns = () => {
        return (
            <div className="action-btn">
                {item.isConfirmed ? (
                    item.isActive ? (
                        <Button
                            variant={buttonVarient}
                            color="primary"
                            onClick={() => save("deactivate")}
                            size="large"
                        >
                            Deactivate
                        </Button>
                    ) : (
                        <Button
                            variant={buttonVarient}
                            color="primary"
                            onClick={() => save("activate")}
                            size="large"
                        >
                            Activate
                        </Button>
                    )
                ) : (
                    <Button
                        variant={buttonVarient}
                        color="primary"
                        onClick={() => save("accept")}
                        size="large"
                    >
                        Confirm as Member
                    </Button>
                )}
            </div>
        );
    };
    const profileInfo = () => {
        return (
            <div className="profileWrap">
                <div className="avatarWrap">
                    {item?.avatarUrl ? (
                        <Avatar
                            alt={userName}
                            src={`${item?.avatarUrl}`}
                            className="avatar avatarMedia"
                            role="img"
                            aria-label={userName}
                        />
                    ) : (
                        <Avatar
                            className="avatar avatarName"
                            role="img"
                            aria-label={userName}
                        >
                            <span className="text">
                                {getAvatarName(userName)}
                            </span>
                        </Avatar>
                    )}

                    <Typography
                        variant="h6"
                        component="h6"
                        className="profileName"
                    >
                        {userName}
                    </Typography>
                </div>
                <div className="otherDetails">
                    <div className="infoWrap">
                        <div className="single">
                            <Typography
                                variant="h6"
                                component="h6"
                                className="title"
                            >
                                FlatNo
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6"
                                className="value"
                            >
                                {item?.flatNo}
                            </Typography>
                        </div>
                        <div className="single">
                            <Typography
                                variant="h6"
                                component="h6"
                                className="title"
                            >
                                Mobile
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6"
                                className="value"
                            >
                                {item?.mobile}
                            </Typography>
                        </div>
                        <div className="single">
                            <Typography
                                variant="h6"
                                component="h6"
                                className="title"
                            >
                                Email
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6"
                                className="value"
                            >
                                {item?.email}
                            </Typography>
                        </div>
                    </div>
                    <div className="actionWrap">{isAdmin && actionBtns()}</div>
                </div>
            </div>
        );
    };

    const complaintTitleFormControl = () => {
        return (
            <FormControl>
                <TextField
                    label="Complain Title"
                    id="title"
                    value={userForm.title.value}
                    onChange={updateForm}
                    variant={inputVarient}
                    required
                    disabled={isAdmin || viewOnly}
                ></TextField>
            </FormControl>
        );
    };

    return (
        <SpinnerLoader show={savingComplaint} fullScreen={true}>
            <div className="popup">
                {item && profileInfo()}
                {!isAdmin && complaintTitleFormControl()}
            </div>
        </SpinnerLoader>
    );
}

export default UserPopup;
