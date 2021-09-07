import logo from "./logo.svg";
import { ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import theme from "./theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <img src={logo} alt="logo" />
      </div>
    </ThemeProvider>
  );
}

export default App;
