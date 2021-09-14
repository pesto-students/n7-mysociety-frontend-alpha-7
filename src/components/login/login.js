import React, { useContext } from "react";
import {
    FormControl,
    TextField,
    Button,
    Card,
    CardContent
} from "../../shared";
import { useFormGroup } from "../../hooks";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../contexts/variant.context";
import "./login.scss";
export default function Login() {
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const [loginForm, updateLoginForm] = useFormGroup({
        username: "",
        password: ""
    });

    const authenticate = () => {};

    const username = (
        <FormControl>
            <TextField
                label="Username"
                id="username"
                value={loginForm.username}
                onChange={updateLoginForm}
                variant={inputVarient}
            ></TextField>
        </FormControl>
    );

    const password = (
        <FormControl>
            <TextField
                label="Password"
                id="password"
                value={loginForm.password}
                onChange={updateLoginForm}
                variant={inputVarient}
            ></TextField>
        </FormControl>
    );

    const loginButton = (
        <div>
            <Button
                color="primary"
                variant={buttonVarient}
                onClick={authenticate}
            >
                Complain
            </Button>
        </div>
    );

    return (
        <Card className="login-box">
            <CardContent>
                {username}
                {password}
                {loginButton}
            </CardContent>
        </Card>
    );
}
