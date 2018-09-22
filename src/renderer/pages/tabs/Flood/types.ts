import Account from "@/account";
import FloodSentence from "@/extensions/flood/FloodSentence";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const floodTabStyles = (theme: Theme) =>
  createStyles({
    card: {
      minWidth: 275
    },
    formControl: {
      margin: theme.spacing.unit
    },
    root: {
      flexGrow: 1,
      margin: theme.spacing.unit * 2,
      maxHeight: 500,
      overflowY: "auto",
      padding: 10
    },
    table: {
      minWidth: 700
    },
    title: {
      color: theme.palette.text.secondary,
      fontSize: 14,
      marginBottom: 16
    }
  });

export interface IAddSentenceForm {
  content: string;
  channel: number;
  onPlayerJoined: boolean;
  onPlayerLeft: boolean;
}

export interface IFloodTabProps extends WithStyles<typeof floodTabStyles> {
  account: Account;
}

export interface IFloodTabState {
  addSentenceForm: IAddSentenceForm;
  characterConnected: boolean;
  generalChannelInterval: number;
  running: boolean;
  salesChannelInterval: number;
  seekChannelInterval: number;
  sentences: FloodSentence[];
}
