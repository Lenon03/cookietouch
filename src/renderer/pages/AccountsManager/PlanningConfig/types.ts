import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { PlanningConfigStyle } from "@renderer/pages/AccountsManager/PlanningConfig/styles";

export interface IPlanningConfigProps {
  //
}

export interface IPlanningConfigState {
  accountsList: AccountConfiguration[];
  active: boolean;
  planning: boolean[];
  selectedAccounts: AccountConfiguration[];
}

export type PlanningConfigProps = IPlanningConfigProps &
  WithStyles<PlanningConfigStyle>;
