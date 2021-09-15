import React, { useContext, useState } from "react";
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
    MenuItem
} from "../../shared";
import {
    InputVarientContext,
    ButtonVarientContext
} from "../../contexts/variant.context";
import { Link, useHistory } from "react-router-dom";
import "./register.scss";
function Register() {
    const [isAdmin, setIsAdmin] = useState(true);
    const [currentTab, setCurrentTab] = useState(0);
    const history = useHistory();
    const [societies] = useState([
        { name: "Alpha", societyId: 0 },
        { name: "Beta", societyId: 1 }
    ]);
    const inputVarient = useContext(InputVarientContext);
    const buttonVarient = useContext(ButtonVarientContext);
    const [registerForm, updateRegisterForm] = useFormGroup({
        email: "",
        societyName: "",
        societyAddress: "",
        societyId: "",
        mobile: "",
        flatNo: "",
        password: "",
        confirmPassword: ""
    });

    const email = (
        <div className="email-input">
            <FormControl>
                <TextField
                    required
                    label={isAdmin ? "Admin Email" : "Member Email"}
                    id="email"
                    value={registerForm.email}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
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
                    value={registerForm.societyName}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
                ></TextField>
            </FormControl>
        </div>
    ) : (
        <div className="socity-name-input">
            <FormControl>
                <InputLabel id="societyId">Society Name</InputLabel>
                <Select
                    id="complainPriority"
                    label="Priority"
                    value={registerForm.societyId}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
                >
                    {societies.map((society, index) => {
                        return (
                            <MenuItem value={society.societyId} key={index}>
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
                    value={registerForm.societyAddress}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
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
                    value={registerForm.password}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
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
                    value={registerForm.confirmPassword}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
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
                    value={registerForm.mobile}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
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
                    value={registerForm.flatNo}
                    onChange={updateRegisterForm}
                    variant={inputVarient}
                ></TextField>
            </FormControl>
        </div>
    );

    const register = () => {
        history.push("/thankyou");
    };

    const registerBtn = (
        <div className="action-btn">
            <Button
                variant={buttonVarient}
                color="primary"
                onClick={() => register()}
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
                    <Typography variant="subtitle2" color="secondary">
                        Login here
                    </Typography>
                </Link>
            </div>
        </div>
    );

    const memberView = (
        <div className="register-content member-view">
            {email}
            {societyName}
            {mobile}
            {flat}
            {password}
            {confirmPassword}
            {registerBtn}
            {registerFooter}
        </div>
    );

    const adminView = (
        <div className="register-content admin-view">
            {email}
            {societyName}
            {societyAddress}
            {password}
            {confirmPassword}
            {registerBtn}
            {registerFooter}
        </div>
    );

    const handleTabChange = (event, value) => {
        event?.stopPropagation();
        setCurrentTab(value);
        if (value) {
            setIsAdmin(false);
        } else {
            setIsAdmin(true);
        }
    };

    const tabs = (
        <div className="tab-bar">
            <div>
                <Typography varient="h5" color="secondary">
                    Who are you?
                </Typography>
            </div>
            <Tabs value={currentTab} onChange={(e, v) => handleTabChange(e, v)}>
                <Tab index={0} label="Admin" />
                <Tab index={1} label="Member" />
            </Tabs>
        </div>
    );

    return (
        <Card className="register-box">
            <CardContent>
                {tabs}
                {isAdmin ? adminView : memberView}
            </CardContent>
        </Card>
    );
}
export default Register;
