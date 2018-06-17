import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: "#FFF",
      dark: "#1de099",
      light: "#1de099",
      main: "#1de099",
    },
    secondary: {
      contrastText: "#FFF",
      dark: "#1dc8cd",
      light: "#1dc8cd",
      main: "#1dc8cd",
    },
  },
});

// tslint:disable-next-line:variable-name
function withRoot(Component: React.ComponentType) {
  function WithRoot(props: object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
