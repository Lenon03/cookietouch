import Group from "@/groups/Group";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const groupItemStyles = (theme: Theme) =>
  createStyles({
    image: {
      color: theme.palette.primary.main,
      height: 30,
      width: 30
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4
    },
    root: {
      flexGrow: 1
    },
    text: {
      color: theme.palette.primary.main,
      fontWeight: "bold"
    }
  });

export interface IGroupItemProps extends WithStyles<typeof groupItemStyles> {
  group: Group;
}

export interface IGroupItemState {
  open: boolean;
}
