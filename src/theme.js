import { createTheme } from "@material-ui/core/styles";
const font = "'Roboto', sans-serif";
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#E85A4F",
    },
    secondary: {
      main: "#E98074",
      contrastText: "rgba(255,255,255,0.87)",
    },
    background: {
      default: "#F9F9F9",
      primary: "#EAE8DC",
    },
    text: {
      primary: "#8E8D8A",
      secondary: "#E98074",
    },
    typography: {
      fontFamily: font,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1388,
      xl: 1920,
    },
  },
});
export default theme;
