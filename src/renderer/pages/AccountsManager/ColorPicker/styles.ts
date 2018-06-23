import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type ColorPickerStyle = "color" | "cover" | "popover" | "swatch";

export const colorPickerStyles: StyleRulesCallback<
  ColorPickerStyle
> = theme => ({
  color: {
    borderRadius: "2px",
    height: "20px",
    width: "36px"
  },
  cover: {
    bottom: "0px",
    left: "0px",
    position: "fixed",
    right: "0px",
    top: "0px"
  },
  popover: {
    position: "absolute",
    zIndex: 2
  },
  swatch: {
    background: "#fff",
    borderRadius: "1px",
    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
    cursor: "pointer",
    display: "inline-block",
    padding: "2px"
  }
});
