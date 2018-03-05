import Reboot from "material-ui/Reboot";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
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
        <Reboot />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
