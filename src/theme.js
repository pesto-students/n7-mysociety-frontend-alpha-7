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
        },
        text: {
            primary: "#8E8D8A",
            secondary: "#E98074",
        },
        typography: {
            fontFamily: font,
            h1: {
                fontSize: 32,
            },
            h2: {
                fontSize: 28,
            },
            h3: {
                fontSize: 24,
            },
            h4: {
                fontSize: 22,
            },
            h5: {
                fontSize: 20,
            },
            h6: {
                fontSize: 18,
            },
            subtitle1: {
                fontSize: 16,
            },
            subtitle2: {
                fontSize: 14,
            },
            button: {
                fontSize: 22,
            },
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
    shape: {
        borderRadius: 15,
    },
    shadows: ["none", "3px 3px 17px -9px rgba(0, 0, 0, 0.25)"],
    overrides: {
        MuiButton: {
            root: {
                textTransform: "inherit",
            },
        },
    },
});
export default theme;
