import { ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import { showModal } from "./store/selectors/modal.selector";
import theme from "./theme";
import { useSelector } from "react-redux";
import {
    InputVarientContext,
    ButtonVarientContext
} from "./contexts/variant.context";
import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing/routing";
import "./fonts/Righteous/Righteous-Regular.ttf";
import { MsModal } from "./shared";
function App() {
    const isModalOpened = useSelector(showModal);
    return (
        <ThemeProvider theme={theme}>
            <InputVarientContext.Provider value="standard">
                <ButtonVarientContext.Provider value="contained">
                    {isModalOpened ? <MsModal /> : null}
                    <Router>
                        <Routing></Routing>
                    </Router>
                </ButtonVarientContext.Provider>
            </InputVarientContext.Provider>
        </ThemeProvider>
    );
}

export default App;
