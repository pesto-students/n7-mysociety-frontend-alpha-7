import { ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing/routing";
function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routing></Routing>
            </Router>
        </ThemeProvider>
    );
}

export default App;
