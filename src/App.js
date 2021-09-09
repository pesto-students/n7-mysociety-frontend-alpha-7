import logo from "./logo.svg";
import { ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import theme from "./theme";
import { Route, Router, Switch } from "react-router";
import Dashboard from "./pages/dashboard";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
