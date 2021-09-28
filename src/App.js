import { ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import theme from "./theme";
import {
    InputVarientContext,
    ButtonVarientContext
} from "./contexts/variant.context";
import React, { useEffect } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing/routing";
import "./fonts/Righteous/Righteous-Regular.ttf";

import { MsModal, Snackbar, SpinnerLoader, WindowCloseIcon } from "./shared";
import { useSelector, useDispatch } from "react-redux";
import { snack, showModal } from "./store/selectors/modal.selector";
import { isFetchingLoggedInUserDetails } from "./store/selectors/authetication.selector";
import { CLOSE_TOASTER } from "./store/actions/modal.action";
import { getCookie } from "./utils";
import { updateLoggedInUserDetails } from "./store/dispatchers/authentication.dispatch";
function App() {
    const snackBarData = useSelector(snack);
    const autoHideDuration = 5000;
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch({ type: CLOSE_TOASTER });
    };

    const isLoadingUserDetails = useSelector(isFetchingLoggedInUserDetails);

    useEffect(() => {
        if (getCookie("society-id")) {
            dispatch(updateLoggedInUserDetails(getCookie("society-id")));
        }
    }, []);

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

    const displayModal = useSelector(showModal);
    return (
        <SpinnerLoader show={isLoadingUserDetails}>
            <ThemeProvider theme={theme}>
                <InputVarientContext.Provider value="standard">
                    <ButtonVarientContext.Provider value="contained">
                        {snackBar}
                        {displayModal ? <MsModal /> : null}
                        <Router>
                            <Routing></Routing>
                        </Router>
                    </ButtonVarientContext.Provider>
                </InputVarientContext.Provider>
            </ThemeProvider>
        </SpinnerLoader>
    );
}

export default App;
