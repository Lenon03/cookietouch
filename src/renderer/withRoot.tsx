import amber from "@material-ui/core/colors/amber";
import blueGrey from "@material-ui/core/colors/blueGrey";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: amber,
    type: "dark"
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
