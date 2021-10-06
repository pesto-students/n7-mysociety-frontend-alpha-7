import React, { useContext, useEffect, useState } from "react";
import {
    FormControl,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    InputAdornment,
    IconButton,
    Visibility,
    VisibilityOff,
    SpinnerLoader
} from "../../shared";
import { useFormGroup } from "../../hooks";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../contexts/variant.context";
import "./login.scss";
import { Link, useHistory } from "react-router-dom";
import { getCookie, Validator } from "../../utils";
import {
    loginUser,
    getAllGuests
} from "../../store/dispatchers/authentication.dispatch";
import {
    isLoggedIn,
    isUserLogging,
    guests
} from "../../store/selectors/authetication.selector";
import { useDispatch, useSelector } from "react-redux";
export default function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedInSuccessFully = useSelector(isLoggedIn);
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const allGuests = useSelector(guests);
    const [loginForm, updateLoginForm] = useFormGroup({
        email: {
            value: "",
            validation: {
                required: true,
                msgs: {
                    required: "email is required"
                }
            },

            error: false,
            errorMessage: ""
        },
        password: {
            value: "",
            validation: {
                required: true,
                //pattern: Validator.regex.password,

                msgs: {
                    required: "Password Required"
                    //pattern: "Password must be strong"
                }
            }
        }
    });
    const loggingInUser = useSelector(isUserLogging);

    useEffect(() => {
        dispatch(getAllGuests());
    }, []);
    // Start of UI
    const email = (
        <div className="email_input">
            <FormControl>
                <TextField
                    required
                    label="Email"
                    id="email"
                    value={loginForm.email.value}
                    onChange={updateLoginForm}
                    variant={inputVarient}
                    helperText={loginForm.email.errorMessage}
                ></TextField>
            </FormControl>
        </div>
    );

    const password = (
        <div className="password_input">
            <FormControl>
                <TextField
                    required
                    label="Password"
                    id="password"
                    value={loginForm.password.value}
                    onChange={updateLoginForm}
                    variant={inputVarient}
                    helperText={loginForm.password.errorMessage}
                    type={passwordVisibility ? "text" : "password"}
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

    const isLoginFormValid = Validator.isFormValid(loginForm);

    const loginButton = (
        <div className="loginBtnWrap">
            <div className="action-btn">
                <Button
                    color="primary"
                    variant={buttonVarient}
                    onClick={() => authenticate()}
                    disabled={!isLoginFormValid}
                >
                    Login
                </Button>
            </div>
            {allGuests && allGuests?.active && (
                <div className="guestLogin">
                    <Link to="#" onClick={() => authenticate("guestAdmin")}>
                        <Typography
                            variant="subtitle2"
                            color="secondary"
                            className="link_tp"
                        >
                            Guest Admin Login
                        </Typography>
                    </Link>
                    <Link to="#" onClick={() => authenticate("guestMember")}>
                        <Typography
                            variant="subtitle2"
                            color="secondary"
                            className="link_tp"
                        >
                            Guest Member Login
                        </Typography>
                    </Link>
                </div>
            )}
        </div>
    );

    const loginFooter = (
        <div className="login-footer">
            <div>
                <Typography variant="subtitle1">
                    Want to be a part of society or register your society?
                </Typography>
            </div>
            <div className="redirectLink">
                <Link to="/user/forget-password">
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        className="link_tp"
                    >
                        Forget password
                    </Typography>
                </Link>
                <Link to="/user/register">
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        className="link_tp"
                    >
                        Sign up
                    </Typography>
                </Link>
            </div>
        </div>
    );

    // End of UI

    useEffect(() => {
        if (isLoggedInSuccessFully && getCookie("x-auth-token")) {
            history.push("/dashboard");
        }
    }, [isLoggedInSuccessFully]);

    //functions
    const authenticate = (loginType = null) => {
        var param = {
            email: loginForm.email.value,
            password: loginForm.password.value
        };
        if (loginType === null) {
            if (isLoginFormValid) {
                dispatch(loginUser(param));
            }
        } else {
            if (loginType === "guestAdmin" && allGuests && allGuests?.active) {
                param = {
                    email: allGuests?.adminEmail,
                    password: allGuests?.adminPass
                };
            } else if (
                loginType === "guestMember" &&
                allGuests &&
                allGuests?.active
            ) {
                param = {
                    email: allGuests?.memberEmail,
                    password: allGuests?.memberPass
                };
            }
            dispatch(loginUser(param));
        }
    };
    // end of functions

    return (
        <SpinnerLoader show={loggingInUser} fullScreen={true}>
            <Card className="login-box">
                <CardContent>
                    <div className="login-content">
                        {email}
                        {password}
                        {loginButton}
                        {loginFooter}
                    </div>
                </CardContent>
            </Card>
        </SpinnerLoader>
    );
}
