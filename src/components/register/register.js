import React, { useContext, useEffect, useState } from "react";
import { useFormGroup } from "../../hooks";
import {
    FormControl,
    Card,
    CardContent,
    Button,
    TextField,
    Typography,
    Tabs,
    Tab,
    InputLabel,
    Select,
    MenuItem,
    SpinnerLoader,
    InputAdornment,
    IconButton,
    Visibility,
    VisibilityOff
} from "../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../contexts/variant.context";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    registerUser,
    getAllSocieties
} from "../../store/dispatchers/authentication.dispatch";
import {
    isRegistered,
    societies,
    isRegisteringUser
} from "../../store/selectors/authetication.selector";
import "./register.scss";
import { useSelector } from "react-redux";
import { Validator } from "../../utils";
function Register() {
    const dispatch = useDispatch();
    const [isAdmin, setIsAdmin] = useState(true);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmVisibility, setConfirmVisibility] = useState(false);
    const [passwordMismatch, setPasswordMismatchError] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const allSocieties = useSelector(societies);
    const history = useHistory();
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const [registerForm, updateRegisterForm, updateValidation] = useFormGroup({
        firstName: {
            value: "",
            validation: {
                required: true,
                msgs: { required: "First name is required" }
            }
        },
        lastName: {
            value: "",
            validation: {
                required: true,
                msgs: { required: "Last name is required" }
            }
        },
        email: {
            value: "",
            validation: {
                required: true,
                pattern: Validator.regex.email,
                msgs: {
                    required: "Email is required",
                    pattern: "Invalid email"
                }
            }
        },
        societyName: {
            value: ""
        },
        societyAddress: {
            value: ""
        },
        societyId: {
            value: ""
        },
        mobile: {
            value: ""
        },
        flatNo: {
            value: ""
        },
        password: {
            value: "",
            validation: {
                required: true,
                pattern: Validator.regex.password,
                msgs: {
                    required: "Password required",
                    pattern: "Invalid Password"
                }
            }
        },
        confirmPassword: {
            value: "",
            validation: {
                required: true,
                msgs: { required: "Confirm Password is required" }
            }
        }
    });

    useEffect(() => {
        dispatch(getAllSocieties());
    }, []);

    useEffect(() => {
        if (isAdmin) {
            updateValidation([
                {
                    id: "societyName",
                    validation: {
                        required: true,
                        msgs: { required: "Society name is required" }
                    }
                },
                {
                    id: "societyAddress",
                    validation: {
                        required: true,
                        msgs: { required: "Society address is required" }
                    }
                },
                {
                    id: "mobile",
                    validation: {
                        required: false,
                        msgs: {
                            required: "Mobile is requred"
                        }
                    }
                },
                {
                    id: "flatNo",
                    validation: {
                        required: false,
                        msgs: { required: "Flat No is required" }
                    }
                },
                {
                    name: "societyId",
                    validation: { required: false }
                }
            ]);
        } else {
            updateValidation([
                {
                    id: "societyName",
                    validation: {
                        required: false
                    }
                },
                {
                    id: "societyAddress",
                    validation: {
                        required: false
                    }
                },
                {
                    id: "mobile",
                    validation: {
                        required: true,
                        pattern: Validator.regex.mobile,
                        msgs: {
                            required: "Mobile is required",
                            pattern: "Invalid mobile number"
                        }
                    }
                },
                {
                    id: "flatNo",
                    validation: {
                        required: true,
                        msgs: { required: "Flat No is required" }
                    }
                },
                {
                    name: "societyId",
                    validation: { required: true }
                }
            ]);
        }
    }, [isAdmin]);

    const isRegisterFormValid =
        Validator.isFormValid(registerForm) && !passwordMismatch;

    // Start of UI

    const firstName = (
        <div className="first-name">
            <FormControl>
                <TextField
                    required
                    label="First Name"
                    id="firstName"
                    value={registerForm.firstName.value}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
                    helperText={registerForm.firstName.errorMessage}
                ></TextField>
            </FormControl>
        </div>
    );

    const lastName = (
        <div className="last-name">
            <FormControl>
                <TextField
                    required
                    label="Last Name"
                    id="lastName"
                    value={registerForm.lastName.value}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
                    helperText={registerForm.lastName.errorMessage}
                ></TextField>
            </FormControl>
        </div>
    );

    const email = (
        <div className="email-input">
            <FormControl>
                <TextField
                    required
                    label={isAdmin ? "Admin Email" : "Member Email"}
                    id="email"
                    type="email"
                    value={registerForm.email.value}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
                    helperText={registerForm.email.errorMessage}
                ></TextField>
            </FormControl>
        </div>
    );

    const societyName = isAdmin ? (
        <div className="socity-name-input">
            <FormControl>
                <TextField
                    required
                    label="Society Name"
                    id="societyName"
                    value={registerForm.societyName.value}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
                    helperText={registerForm.societyName.errorMessage}
                ></TextField>
            </FormControl>
        </div>
    ) : (
        <div className="socity-name-input">
            <FormControl>
                <InputLabel id="societyId" name="societyId">
                    Society Name
                </InputLabel>

                <Select
                    id="society"
                    label="Society"
                    labelId="societyId"
                    name="societyId"
                    value={registerForm.societyId.value}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
                >
                    {allSocieties?.map((society, index) => {
                        return (
                            <MenuItem value={society._id} key={index}>
                                {society.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );

    const societyAddress = (
        <div className="society-address-input">
            <FormControl>
                <TextField
                    required
                    label="Society Address"
                    id="societyAddress"
                    value={registerForm.societyAddress.value}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
                    helperText={registerForm.societyAddress.errorMessage}
                ></TextField>
            </FormControl>
        </div>
    );

    const password = (
        <div className="password-input">
            <FormControl>
                <TextField
                    required
                    label="Password"
                    id="password"
                    value={registerForm.password.value}
                    type={passwordVisibility ? "text" : "password"}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
                    helperText={registerForm.password.errorMessage}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        setPasswordVisibility(
                                            !passwordVisibility
                                        )
                                    }
                                    edge="end"
                                >
                                    {passwordVisibility ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                ></TextField>
            </FormControl>
        </div>
    );

    const checkPassword = (event) => {
        console.log(event);

        if (registerForm.password.value !== event.target.value) {
            setPasswordMismatchError(true);
        } else {
            setPasswordMismatchError(false);
        }
    };

    const confirmPasswordError = () => {
        if (registerForm.confirmPassword.errorMessage) {
            return registerForm.confirmPassword.errorMessage;
        }
        if (passwordMismatch) {
            return "Password mismatch";
        }
        return "";
    };

    const confirmPassword = (
        <div className="password-input">
            <FormControl>
                <TextField
                    required
                    label="Confirm Password"
                    id="confirmPassword"
                    type={confirmVisibility ? "text" : "password"}
                    value={registerForm.confirmPassword.value}
                    onChange={(e) => {
                        updateRegisterForm(e);
                        checkPassword(e);
                    }}
                    variant={inputVarient}
                    helperText={confirmPasswordError()}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        setConfirmVisibility(!confirmVisibility)
                                    }
                                    edge="end"
                                >
                                    {confirmVisibility ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                ></TextField>
            </FormControl>
        </div>
    );

    const mobile = (
        <div className="mobile-input">
            <FormControl>
                <TextField
                    required
                    label="Mobile"
                    id="mobile"
                    value={registerForm.mobile.value}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
                    helperText={registerForm.mobile.errorMessage}
                ></TextField>
            </FormControl>
        </div>
    );

    const flat = (
        <div className="flat-input">
            <FormControl>
                <TextField
                    required
                    label="Flat Number"
                    id="flatNo"
                    value={registerForm.flatNo.value}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
                    helperText={registerForm.flatNo.errorMessage}
                ></TextField>
            </FormControl>
        </div>
    );

    const registerBtn = (
        <div className="action-btn">
            <Button
                variant={buttonVarient}
                color="primary"
                onClick={() => register()}
                disabled={!isRegisterFormValid}
            >
                Register
            </Button>
        </div>
    );

    const registerFooter = (
        <div className="register-footer">
            <div>
                <Typography variant="subtitle1">
                    Already have a account?
                </Typography>
            </div>
            <div>
                <Link to="/user/login">
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        className="link_tp"
                    >
                        Login
                    </Typography>
                </Link>
            </div>
        </div>
    );

    const personalDetails = (
        <div className="personal-details">
            {firstName}
            {lastName}
        </div>
    );

    const contactDetails = (
        <div className="contact-details">
            {mobile}
            {flat}
        </div>
    );

    const memberView = (
        <div className="register-content member-view">
            {personalDetails}
            {email}
            {societyName}
            {contactDetails}
            {password}
            {confirmPassword}
            {registerBtn}
            {registerFooter}
        </div>
    );

    const adminView = (
        <div className="register-content admin-view">
            {personalDetails}
            {email}
            {societyName}
            {societyAddress}
            {password}
            {confirmPassword}
            {registerBtn}
            {registerFooter}
        </div>
    );

    useEffect(() => {
        if (currentTab) {
            setIsAdmin(false);
        } else {
            setIsAdmin(true);
        }
    }, [currentTab]);

    const handleTabChange = (event, value) => {
        event?.stopPropagation();
        setCurrentTab(value);
    };

    const tabs = (
        <div className="tab-bar">
            <Tabs value={currentTab} onChange={(e, v) => handleTabChange(e, v)}>
                <Tab index={0} label="Admin" />
                <Tab index={1} label="Member" />
            </Tabs>
        </div>
    );

    const registeredSuccessFully = useSelector(isRegistered);
    const registeringUser = useSelector(isRegisteringUser);

    if (registeredSuccessFully) {
        history.push("/thankyou");
    }

    // End of UI

    //functions

    const getSaveParam = () => {
        const {
            firstName,
            lastName,
            email,
            mobile,
            societyId,
            societyName,
            societyAddress,
            password,
            flatNo
        } = registerForm;
        let obj = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            role: isAdmin ? "admin" : "member",
            societyName: societyName.value,
            societyAddress: societyAddress.value,
            password: password.value
        };

        if (!isAdmin) {
            obj = {
                ...obj,
                societyId: societyId.value,
                mobile: mobile.value,
                flatNo: flatNo.value
            };
        }
        return obj;
    };

    const register = () => {
        console.log(registerForm);
        const param = getSaveParam();

        dispatch(registerUser(param));
    };

    // end of functions

    return (
        <SpinnerLoader show={registeringUser} fullScreen={true}>
            <Card className="register-box">
                <CardContent>
                    {tabs}
                    {isAdmin ? adminView : memberView}
                </CardContent>
            </Card>
        </SpinnerLoader>
    );
}
export default Register;
