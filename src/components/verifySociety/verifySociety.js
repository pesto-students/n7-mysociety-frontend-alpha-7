import React, { useContext, useState } from "react";
import { Button, Card, CardContent, Typography } from "../../shared";
import { useFormGroup } from "../../hooks";
import { ButtonVarientContext } from "../../contexts/variant.context";
import "./verifySociety.scss";
import { useHistory } from "react-router-dom";
import { verifySociety } from "../../store/dispatchers/authentication.dispatch";
import { isSocietyVerificationDone } from "../../store/selectors/authetication.selector";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { toaster } from "../../utils";
import { useParams } from "react-router";
export default function VerifySociety() {
    const { token } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const isSocietyVerifiedSuccessFully = useSelector(
        isSocietyVerificationDone
    );
    const buttonVarient = useContext(ButtonVarientContext);

    const [isFormValid, setIsFormValid] = useState(false);
    const [forgetPasswordForm, updateForm] = useFormGroup({
        token: {
            value: token
        },
        captcha: {
            value: ""
        }
    });
    function onCaptchaChange(value) {
        updateForm({ target: { id: "captcha", value: value } });
        setIsFormValid(true);
    }

    const recaptcha = (
        <div className="recaptchWrap">
            <ReCAPTCHA
                sitekey="6Ler8I0cAAAAAC0xtbCSm0q7MsAb_YBzK-ber6wO"
                onChange={onCaptchaChange}
            />
        </div>
    );

    const verify = (
        <div className="action-btn">
            <Button
                color="primary"
                variant={buttonVarient}
                onClick={() => authenticate()}
                disabled={!isFormValid}
            >
                Verify
            </Button>
        </div>
    );

    // End of UI

    if (isSocietyVerifiedSuccessFully) {
        history.push("/user/signin");
    }

    //functions
    const authenticate = () => {
        const param = {
            token: forgetPasswordForm.token.value,
            captcha: forgetPasswordForm.captcha.value
        };

        if (param.token !== "" && param.captcha !== "") {
            dispatch(verifySociety(param));
        } else {
            toaster.showErrorMessage(dispatch, "Please fill verify captcha.");
        }
    };
    // end of functions

    return (
        <Card className="verification-box">
            <CardContent>
                <div className="verification-content">
                    <Typography
                        variant="subtitle1"
                        color="primary"
                        className="shortText"
                    >
                        You are very close to access your society dashboard.
                        Click on verify button and verify your society.
                    </Typography>
                    {recaptcha}
                    {verify}
                </div>
            </CardContent>
        </Card>
    );
}
