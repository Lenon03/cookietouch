import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: "#FFF",
      dark: "#6B331C",
      light: "#6B331C",
      main: "#6B331C"
    },
    secondary: {
      contrastText: "#FFF",
      dark: "#EFC991",
      light: "#EFC991",
      main: "#EFC991"
    }
  },
  spacing: {
    unit: 3
  },
  typography: {
    fontSize: 12
  }
});

// tslint:disable-next-line:variable-name
function withRoot(Component: React.ComponentType) {
  function WithRoot(props: object) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
