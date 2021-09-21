import { ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import theme from "./theme";
import {
    InputVarientContext,
    ButtonVarientContext
} from "./contexts/variant.context";
import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing/routing";
import "./fonts/Righteous/Righteous-Regular.ttf";

import { Snackbar, WindowCloseIcon } from "./shared";
import { useSelector, useDispatch } from "react-redux";
import { snack } from "./store/selectors/modal.selector";
import { CLOSE_TOASTER } from "./store/actions/modal.action";
function App() {
    const snackBarData = useSelector(snack);
    const autoHideDuration = 5000;
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch({ type: CLOSE_TOASTER });
    };

    if (snackBarData.show) {
        setTimeout(() => {
            handleClose();
        }, autoHideDuration);
    }

    const closeIcon = (
        <WindowCloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
    );
    const snackBar = (
        <Snackbar
            open={snackBarData.show}
            message={snackBarData.message}
            action={closeIcon}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            className={
                snackBarData?.type === "error"
                    ? "error-message"
                    : "success-message"
            }
            elevation={0}
        />
    );

    return (
        <ThemeProvider theme={theme}>
            <InputVarientContext.Provider value="standard">
                <ButtonVarientContext.Provider value="contained">
                    {snackBar}
                    <Router>
                        <Routing></Routing>
                    </Router>
                </ButtonVarientContext.Provider>
            </InputVarientContext.Provider>
        </ThemeProvider>
    );
}

export default App;
