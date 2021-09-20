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
function App() {
    return (
        <ThemeProvider theme={theme}>
            <InputVarientContext.Provider value="standard">
                <ButtonVarientContext.Provider value="contained">
                    <Router>
                        <Routing></Routing>
                    </Router>
                </ButtonVarientContext.Provider>
            </InputVarientContext.Provider>
        </ThemeProvider>
    );
}

export default App;
