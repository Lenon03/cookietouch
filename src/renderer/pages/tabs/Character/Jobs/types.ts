import Account from "@/account";
import JobEntry from "@/game/character/jobs/JobEntry";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { CharacterJobsTabStyle } from "@renderer/pages/tabs/Character/Jobs/styles";

export interface ICharacterJobsTabProps {
  account: Account;
}

export interface ICharacterJobsTabState {
  jobs: JobEntry[];
}

export type CharacterJobsTabProps = ICharacterJobsTabProps &
  WithStyles<CharacterJobsTabStyle>;
