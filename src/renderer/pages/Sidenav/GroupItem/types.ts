import Group from "@/groups/Group";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { GroupItemStyle } from "@renderer/pages/Sidenav/GroupItem/styles";

export interface IGroupItemProps {
  group: Group;
}

export interface IGroupItemState {
  open: boolean;
}

export type GroupItemProps = IGroupItemProps & WithStyles<GroupItemStyle>;
