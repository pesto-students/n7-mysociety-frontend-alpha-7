import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#5893df",
        },
        secondary: {
            main: "#2ec5d3",
        },
        background: {
            default: "#192231",
            paper: "#24344d",
        },
    },
});
export default theme;
