import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type MapViewerStyle = "root" | "tooltip";

export const mapViewerStyles: StyleRulesCallback<MapViewerStyle> = theme => ({
  root: {
    flexGrow: 1
  },
  tooltip: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: "5px",
    boxShadow:
      "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
    color: "#fff",
    display: "inline-block",
    margin: "5px",
    padding: "5px",
    textAlign: "center",
    visibility: "hidden",
    width: "200px",

    /* Position the tooltip */
    position: "absolute",
    zIndex: 1
  }
});
