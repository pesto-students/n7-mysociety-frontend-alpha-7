import React, { useContext, useState } from "react";
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
import { Validator } from "../../utils";
import { loginUser } from "../../store/dispatchers/authentication.dispatch";
import {
    isLoggedIn,
    isUserLogging
} from "../../store/selectors/authetication.selector";
import { useDispatch, useSelector } from "react-redux";
export default function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedInSuccessFully = useSelector(isLoggedIn);
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [loginForm, updateLoginForm] = useFormGroup({
        username: {
            value: "",
            validation: {
                required: true,
                msgs: {
                    required: "Username is required"
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

    // Start of UI
    const username = (
        <div className="username_input">
            <FormControl>
                <TextField
                    required
                    label="Username"
                    id="username"
                    value={loginForm.username.value}
                    onChange={updateLoginForm}
                    variant={inputVarient}
                    helperText={loginForm.username.errorMessage}
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
    );

    const loginFooter = (
        <div className="login-footer">
            <div>
                <Typography variant="subtitle1">
                    Want to be a part of society or register your society?
                </Typography>
            </div>
            <div>
                <Link to="/user/register">
                    <Typography variant="subtitle2" color="secondary">
                        Sign up here
                    </Typography>
                </Link>
            </div>
        </div>
    );

    // End of UI

    if (isLoggedInSuccessFully) {
        history.push("/dashboard");
    }

    //functions
    const authenticate = () => {
        const param = {
            email: loginForm.username.value,
            password: loginForm.password.value
        };
        console.log(param);

        if (isLoginFormValid) {
            dispatch(loginUser(param));
        }
    };
    // end of functions

    return (
        <SpinnerLoader show={loggingInUser} fullScreen={true}>
            <Card className="login-box">
                <CardContent>
                    <div className="login-content">
                        {username}
                        {password}
                        {loginButton}
                        {loginFooter}
                    </div>
                </CardContent>
            </Card>
        </SpinnerLoader>
    );
}
