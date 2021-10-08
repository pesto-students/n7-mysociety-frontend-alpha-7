import React, { useContext } from "react";
import {
    FormControl,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    SpinnerLoader
} from "../../shared";
import { useFormGroup } from "../../hooks";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../contexts/variant.context";
import "./forgetPassword.scss";
import { Link, useHistory } from "react-router-dom";
import { Validator } from "../../utils";
import { forgetPassword } from "../../store/dispatchers/authentication.dispatch";
import {
    isLoggedIn,
    isUserLogging,
    isForgetPasswordDone
} from "../../store/selectors/authetication.selector";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { toaster } from "../../utils";
export default function ForgetPassword() {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedInSuccessFully = useSelector(isLoggedIn);
    const isForgetPasswordSuccessFully = useSelector(isForgetPasswordDone);
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);

    const [forgetPasswordForm, updateForm] = useFormGroup({
        email: {
            value: "",
            validation: {
                required: true,
                msgs: {
                    required: "Email is required"
                }
            },

            error: false,
            errorMessage: ""
        },
        captcha: {
            value: ""
        }
    });
    const loggingInUser = useSelector(isUserLogging);
    function onCaptchaChange(value) {
        console.log("Captcha value:", value);

        updateForm({ target: { id: "captcha", value: value } });
    }

    const email = (
        <div className="email_input">
            <FormControl>
                <TextField
                    required
                    label="email"
                    id="email"
                    value={forgetPasswordForm.email.value}
                    onChange={updateForm}
                    variant={inputVarient}
                    helperText={forgetPasswordForm.email.errorMessage}
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

    const isFormValid = Validator.isFormValid(forgetPasswordForm);

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

    const forgetPasswordFooter = (
        <div className="login-footer">
            <div>
                <Typography variant="subtitle1">
                    Want to be a part of society or register your society?
                </Typography>
            </div>
            <div className="redirectLink">
                <Link to="/user/login">
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        className="link_tp"
                    >
                        Login
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

    if (isLoggedInSuccessFully) {
        history.push("/dashboard");
    }
    if (isForgetPasswordSuccessFully) {
        history.push("/user/signin");
    }

    //functions
    const authenticate = () => {
        console.log(forgetPasswordForm);
        const param = {
            email: forgetPasswordForm.email.value,
            captcha: forgetPasswordForm.captcha.value
        };

        if (isFormValid && param.email !== "" && param.captcha !== "") {
            dispatch(forgetPassword(param));
        } else {
            toaster.showErrorMessage(
                dispatch,
                "Please fill all the required details."
            );
        }
    };
    // end of functions

    return (
        <SpinnerLoader show={loggingInUser} fullScreen={true}>
            <Card className="login-box">
                <CardContent>
                    <div className="login-content">
                        {email}
                        {recaptcha}
                        {submit}
                        {forgetPasswordFooter}
                    </div>
                </CardContent>
            </Card>
        </SpinnerLoader>
    );
}
