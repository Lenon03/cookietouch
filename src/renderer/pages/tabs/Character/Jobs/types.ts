import Account from "@/account";
import JobEntry from "@/game/character/jobs/JobEntry";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const characterJobsTabStyles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxHeight: 400,
      overflowY: "auto",
      padding: 10
    },
    table: {
      minWidth: 700
    }
  });

export interface ICharacterJobsTabProps
  extends WithStyles<typeof characterJobsTabStyles> {
  account: Account;
}

export interface ICharacterJobsTabState {
  jobs: JobEntry[];
}
