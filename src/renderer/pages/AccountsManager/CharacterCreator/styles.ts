import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";

export type CharacterCreatorStyle =
  | "root"
  | "heading"
  | "formControl"
  | "icon"
  | "chip"
  | "chips";

export const characterCreatorStyles: StyleRulesCallback<
  CharacterCreatorStyle
> = theme => ({
  chip: {
    margin: theme.spacing.unit / 4
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  icon: {
    color: theme.palette.primary.main,
    // color: "#015357",
    marginRight: 8
  },
  root: {
    flexGrow: 1
  }
});
