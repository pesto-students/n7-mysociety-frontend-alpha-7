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

    // Start of UI
    const email = (
        <div className="email_input" data-testid="email_id_input">
            <FormControl>
                <TextField
                    data-testid="email_input"
                    required
                    label="Email"
                    id="email"
                    type="email"
                    value={loginForm.email.value}
                    onChange={updateLoginForm}
                    variant={inputVarient}
                    helperText={loginForm.email.errorMessage}
                ></TextField>
            </FormControl>
        </div>
    );

    const password = (
        <div className="password_input" data-testid="user_password_input">
            <FormControl>
                <TextField
                    data-testid="password_input"
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
        <div className="action-btn" data-testid="login_btn_div">
            <Button
                color="primary"
                variant={buttonVarient}
                onClick={() => authenticate()}
                disabled={!isLoginFormValid}
                data-testid="login_btn"
            >
                Login
            </Button>
        </div>
    );

    const loginFooter = (
        <div className="login-footer" data-testid="login_box_footer_div">
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
        if (isLoggedInSuccessFully) {
            history.push("/dashboard");
        }
    }, [isLoggedInSuccessFully]);

    useEffect(() => {
        if (getCookie("x-auth-token")) {
            history.push("/dashboard");
        }
    }, []);

    //functions
    const authenticate = () => {
        const param = {
            email: loginForm.email.value,
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
