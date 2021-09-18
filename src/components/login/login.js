import React, { useContext } from "react";
import {
    FormControl,
    TextField,
    Button,
    Card,
    CardContent,
    Typography
} from "../../shared";
import { useFormGroup } from "../../hooks";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../contexts/variant.context";
import "./login.scss";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
    const history = useHistory();
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const [loginForm, updateLoginForm] = useFormGroup({
        username: "",
        password: ""
    });

    const authenticate = () => {
        history.push("/dashboard");
    };

    const username = (
        <div className="username_input">
            <FormControl>
                <TextField
                    required
                    label="Username"
                    id="username"
                    value={loginForm.username}
                    onChange={updateLoginForm}
                    variant={inputVarient}
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
                    value={loginForm.password}
                    onChange={updateLoginForm}
                    variant={inputVarient}
                ></TextField>
            </FormControl>
        </div>
    );

    const loginButton = (
        <div className="action-btn">
            <Button
                color="primary"
                variant={buttonVarient}
                onClick={authenticate}
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

    return (
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
    );
}
