import React, { useContext } from "react";
import { TextField, Button, SpinnerLoader } from "../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../contexts/variant.context";
import { useFormGroup } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../../store/dispatchers/user.dispatch";
import { uploadToFireBaseStore, Validator } from "../../utils";
import {
    loggedInUserDetails,
    loggedInUserSocietyDetails
} from "../../store/selectors/authetication.selector";
import { isUserSaving } from "../../store/selectors/user.selector";
import "./profile.scss";
import {
    Avatar,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
    FormControl
} from "@material-ui/core";
import { getAvatarName } from "../../helpers/functions";
import DefaultLayout from "../../components/layout/defaultLayout/index";
const Profile = () => {
    const dispatch = useDispatch();
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const userInfo = useSelector(loggedInUserDetails);
    const societyDetails = useSelector(loggedInUserSocietyDetails);
    const savingComplaint = useSelector(isUserSaving);
    const userName = `${userInfo?.firstName} ${userInfo?.lastName}`;
    const formGroup = {
        firstName: {
            value: userInfo?.firstName ?? "",
            validation: {
                required: true,
                msgs: {
                    required: "FirstName required"
                }
            }
        },
        lastName: {
            value: userInfo?.lastName ?? "",
            validation: {
                required: true,
                msgs: {
                    required: "LastName required"
                }
            }
        },
        mobile: {
            value: userInfo?.mobile ?? "",
            validation: {
                pattern: Validator.regex.mobile,
                msgs: {
                    pattern: "Invalid mobile no"
                }
            }
        },
        email: {
            value: userInfo?.email ?? "",
            validation: {
                required: true,
                pattern: Validator.regex.email,
                msgs: {
                    required: "Email is required",
                    pattern: "Invalid email"
                }
            }
        },
        gender: {
            value: userInfo?.gender ?? "male",
            validation: {
                required: true,
                msgs: {
                    required: "Gender required"
                }
            }
        },
        flatNo: {
            value: userInfo?.flatNo ?? "",
            validation: {
                required: true,
                msgs: {
                    required: "Flat no required"
                }
            }
        },
        avatarUrl: {
            value: userInfo?.avatarUrl ?? ""
        },
        _id: { value: userInfo?._id ?? 0 }
    };
    const [userForm, updateForm] = useFormGroup(formGroup);
    const isUserDataValid = Validator.isFormValid(userForm);

    const save = () => {
        let payload = {
            societyId: societyDetails._id,
            firstName: userForm?.firstName?.value,
            lastName: userForm?.lastName?.value,
            mobile: userForm?.mobile?.value,
            email: userForm?.email?.value,
            gender: userForm?.gender?.value,
            flatNo: userForm?.flatNo?.value,
            avatarUrl: userForm?.avatarUrl?.value
        };

        if (userForm?._id?.value) {
            payload = {
                ...payload,
                _id: userForm._id.value
            };
        }
        console.log(payload, "payload");
        dispatch(saveUser(payload, userInfo?.email));
    };

    const uploadProfilePic = (e) => {
        uploadToFireBaseStore(e.target.files[0], "profile")
            .then((response) => {
                updateForm({
                    target: { id: "avatarUrl", value: response }
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const actionBtns = () => {
        return (
            <div className="action-btn">
                <Button
                    variant={buttonVarient}
                    color="primary"
                    onClick={() => save()}
                    size="large"
                    disabled={!isUserDataValid}
                >
                    Save
                </Button>
            </div>
        );
    };
    const profileInfo = () => {
        return (
            <div className="profileWrap">
                <div className="avatarWrap">
                    <div className="picture">
                        {userForm?.avatarUrl?.value ? (
                            <Avatar
                                alt={userName}
                                src={`${userForm?.avatarUrl?.value}`}
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

                        <input
                            type="file"
                            style={{ display: "none" }}
                            id="profile-image-uploader"
                            accept="image/*"
                            onChange={uploadProfilePic}
                        />

                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            className="avatarUpdate"
                        >
                            <label htmlFor="profile-image-uploader">
                                Update
                            </label>
                        </Button>
                    </div>
                    <div className="societyDetails">
                        <div className="infoWrap">
                            <div className="single">
                                <Typography
                                    variant="p"
                                    component="subtitle1"
                                    className="title"
                                >
                                    Society Name
                                </Typography>
                                <Typography
                                    variant="p"
                                    component="subtitle2"
                                    className="value"
                                >
                                    {societyDetails?.name}
                                </Typography>
                            </div>
                            <div className="single">
                                <Typography
                                    variant=""
                                    component="subtitle1"
                                    className="title"
                                >
                                    Society Address
                                </Typography>
                                <Typography
                                    variant="p"
                                    component="subtitle2"
                                    className="value"
                                >
                                    {societyDetails?.address}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="otherDetails">
                    <div>
                        <div className="infoWrap">
                            <div className="single">
                                <FormControl
                                    component="fieldset"
                                    className="gender"
                                >
                                    <FormLabel component="legend">
                                        Gender
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="gender"
                                        name="gender"
                                        onChange={updateForm}
                                        defaultValue="male"
                                        className="genderGroup"
                                    >
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio />}
                                            label="Male"
                                            checked={
                                                userForm.gender.value === ""
                                                    ? true
                                                    : userForm.gender.value ===
                                                      "male"
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio />}
                                            label="Female"
                                            checked={
                                                userForm.gender.value ===
                                                "female"
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className="single">
                                <TextField
                                    label="Mobile No"
                                    id="mobile"
                                    value={userForm.mobile.value}
                                    onChange={updateForm}
                                    variant={inputVarient}
                                    required
                                    helperText={userForm.mobile.errorMessage}
                                ></TextField>
                            </div>
                            <div className="single">
                                <TextField
                                    label="Email"
                                    id="email"
                                    value={userForm.email.value}
                                    onChange={updateForm}
                                    variant={inputVarient}
                                    required
                                    helperText={userForm.email.errorMessage}
                                    disabled={true}
                                ></TextField>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="infoWrap second">
                            <div className="single">
                                <TextField
                                    label="FirstName"
                                    id="firstName"
                                    value={userForm.firstName.value}
                                    onChange={updateForm}
                                    variant={inputVarient}
                                    required
                                    helperText={userForm.firstName.errorMessage}
                                ></TextField>
                            </div>
                            <div className="single">
                                <TextField
                                    label="LastName"
                                    id="lastName"
                                    value={userForm.lastName.value}
                                    onChange={updateForm}
                                    variant={inputVarient}
                                    required
                                    helperText={userForm.lastName.errorMessage}
                                ></TextField>
                            </div>
                            <div className="single">
                                <TextField
                                    label="Flat No"
                                    id="flatNo"
                                    value={userForm.flatNo.value}
                                    onChange={updateForm}
                                    variant={inputVarient}
                                    required
                                    helperText={userForm.flatNo.errorMessage}
                                ></TextField>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="actionWrap">{actionBtns()}</div>
            </div>
        );
    };

    return (
        <div className="wrapper">
            <DefaultLayout>
                <SpinnerLoader show={savingComplaint} fullScreen={true}>
                    <div className="user">{userInfo && profileInfo()}</div>
                </SpinnerLoader>
            </DefaultLayout>
        </div>
    );
};

export default Profile;
