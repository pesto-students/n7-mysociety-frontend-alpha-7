import React, { useContext } from "react";
import { TextField, Button, SpinnerLoader } from "../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../contexts/variant.context";
import { useFormGroup } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { saveSociety } from "../../store/dispatchers/user.dispatch";
import { Validator } from "../../utils";
import { loggedInUserSocietyDetails } from "../../store/selectors/authetication.selector";
import { isUserSaving } from "../../store/selectors/user.selector";
import "./societyProfile.scss";
import DefaultLayout from "../../components/layout/defaultLayout/index";
const SocietyProfile = () => {
    const dispatch = useDispatch();
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const savingComplaint = useSelector(isUserSaving);
    const formGroup = {
        name: {
            value: societyDetails?.name ?? "",
            validation: {
                required: true,
                msgs: {
                    required: "Society name is required"
                }
            }
        },
        address: {
            value: societyDetails?.address ?? "",
            validation: {
                required: true,
                msgs: {
                    required: "Society address is required"
                }
            }
        },
        mobile: {
            value: societyDetails?.mobile ?? "",
            validation: {
                pattern: Validator.regex.mobile,
                required: true,
                msgs: {
                    pattern: "Invalid mobile no"
                }
            }
        },
        email: {
            value: societyDetails?.societyEmail ?? "",
            validation: {
                required: true,
                pattern: Validator.regex.email,
                msgs: {
                    required: "Email is required",
                    pattern: "Invalid email"
                }
            }
        },
        _id: { value: societyDetails?._id ?? 0 }
    };
    const [societyForm, updateForm] = useFormGroup(formGroup);
    const isSocietyDataValid = Validator.isFormValid(societyForm);

    const save = () => {
        let payload = {
            name: societyForm?.name?.value,
            address: societyForm?.address?.value,
            mobile: societyForm?.mobile?.value
        };

        if (societyForm?._id?.value) {
            payload = {
                ...payload,
                societyId: societyForm._id.value
            };
        }
        console.log(payload, "payload");
        dispatch(saveSociety(payload));
    };

    const actionBtns = () => {
        return (
            <div className="action-btn">
                <Button
                    variant={buttonVarient}
                    color="primary"
                    onClick={() => save()}
                    size="large"
                    disabled={!isSocietyDataValid}
                >
                    Save
                </Button>
            </div>
        );
    };
    const societyInfoView = () => {
        return (
            <div className="societyIntoWrap">
                <div className="single">
                    <TextField
                        label="Society Name"
                        id="name"
                        value={societyForm.name.value}
                        onChange={updateForm}
                        variant={inputVarient}
                        required
                        helperText={societyForm.name.errorMessage}
                    ></TextField>
                </div>
                <div className="single">
                    <TextField
                        label="Society Address"
                        id="address"
                        value={societyForm.address.value}
                        onChange={updateForm}
                        variant={inputVarient}
                        required
                        helperText={societyForm.address.errorMessage}
                    ></TextField>
                </div>
                <div className="single">
                    <TextField
                        label="Email"
                        id="email"
                        value={societyForm.email.value}
                        onChange={updateForm}
                        variant={inputVarient}
                        required
                        helperText={societyForm.email.errorMessage}
                    ></TextField>
                </div>
                <div className="single">
                    <TextField
                        label="Mobile No"
                        id="mobile"
                        value={societyForm.mobile.value}
                        onChange={updateForm}
                        variant={inputVarient}
                        required
                        helperText={societyForm.mobile.errorMessage}
                    ></TextField>
                </div>
                <div className="actionWrap">{actionBtns()}</div>
            </div>
        );
    };

    return (
        <div className="wrapper">
            <DefaultLayout>
                <SpinnerLoader show={savingComplaint} fullScreen={true}>
                    <div className="society">
                        {societyDetails && societyInfoView()}
                    </div>
                </SpinnerLoader>
            </DefaultLayout>
        </div>
    );
};

export default SocietyProfile;
