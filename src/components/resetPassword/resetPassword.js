import React, { useContext, useState } from "react";
import {
    FormControl,
    TextField,
    Button,
    Card,
    CardContent,
    SpinnerLoader,
    VisibilityOff,
    Visibility,
    IconButton,
    InputAdornment
} from "../../shared";
import { useFormGroup } from "../../hooks";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../contexts/variant.context";
import "./resetPassword.scss";
import { useHistory, useParams } from "react-router-dom";
import { Validator } from "../../utils";
import { resetPassword } from "../../store/dispatchers/authentication.dispatch";
import {
    isLoggedIn,
    isUserLogging,
    isResetPasswordDone
} from "../../store/selectors/authetication.selector";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { toaster } from "../../utils";
export default function ResetPassword() {
    const { token } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedInSuccessFully = useSelector(isLoggedIn);
    const isResetPasswordSuccessFully = useSelector(isResetPasswordDone);
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmVisibility, setConfirmVisibility] = useState(false);
    const [passwordMismatch, setPasswordMismatchError] = useState(false);
    const [resetForm, updateForm] = useFormGroup({
        token: {
            value: token
        },
        captcha: {
            value: "",
            validation: {
                required: true,
                msgs: {
                    required: "Captcha required"
                }
            }
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
    const loggingInUser = useSelector(isUserLogging);
    function onCaptchaChange(value) {
        updateForm({ target: { id: "captcha", value: value } });
    }

    if (isLoggedInSuccessFully) {
        history.push("/dashboard");
    }
    if (isResetPasswordSuccessFully) {
        history.push("/user/signin");
    }

    //functions
    const authenticate = () => {
        const param = {
            token: resetForm.token.value,
            password: resetForm.password.value,
            captcha: resetForm.captcha.value
        };

        if (
            isFormValid &&
            param.password !== "" &&
            param.token !== "" &&
            param.captcha !== ""
        ) {
            dispatch(resetPassword(param));
        } else {
            toaster.showErrorMessage(
                dispatch,
                "Please fill all the required details."
            );
        }
    };
    // end of functions

    const checkPassword = (event) => {
        console.log(event);

        if (resetForm.password.value !== event.target.value) {
            setPasswordMismatchError(true);
        } else {
            setPasswordMismatchError(false);
        }
    };

    const confirmPasswordError = () => {
        if (resetForm.confirmPassword.errorMessage) {
            return resetForm.confirmPassword.errorMessage;
        }
        if (passwordMismatch) {
            return "Password mismatch";
        }
        return "";
    };

    const password = (
        <div className="password-input">
            <FormControl>
                <TextField
                    required
                    label="Password"
                    id="password"
                    value={resetForm.password.value}
                    type={passwordVisibility ? "text" : "password"}
                    onChange={updateForm}
                    variant={inputVarient}
                    helperText={resetForm.password.errorMessage}
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

    const confirmPassword = (
        <div className="password-input">
            <FormControl>
                <TextField
                    required
                    label="Confirm Password"
                    id="confirmPassword"
                    type={confirmVisibility ? "text" : "password"}
                    value={resetForm.confirmPassword.value}
                    onChange={(e) => {
                        updateForm(e);
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
    const recaptcha = (
        <div className="recaptchWrap">
            <ReCAPTCHA
                sitekey="6Ler8I0cAAAAAC0xtbCSm0q7MsAb_YBzK-ber6wO"
                onChange={onCaptchaChange}
            />
        </div>
    );
    const isFormValid = Validator.isFormValid(resetForm) && !passwordMismatch;
    const submit = (
        <div className="action-btn">
            <Button
                color="primary"
                variant={buttonVarient}
                onClick={() => authenticate()}
                disabled={!isFormValid}
            >
                Submit
            </Button>
        </div>
    );

    return (
        <SpinnerLoader show={loggingInUser} fullScreen={true}>
            <Card className="login-box">
                <CardContent>
                    <div className="login-content">
                        {password}
                        {confirmPassword}
                        {recaptcha}
                        {submit}
                    </div>
                </CardContent>
            </Card>
        </SpinnerLoader>
    );
}
