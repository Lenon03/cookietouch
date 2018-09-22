import Account from "@/account";
import { IMessage } from "@/core/logger";
import { ChatChannelsMultiEnum } from "@/protocol/enums/ChatChannelsMultiEnum";
import { PlayerStatusEnum } from "@/protocol/enums/PlayerStatusEnum";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const consoleTabStyles = (theme: Theme) =>
  createStyles({
    cleanConsole: {
      width: "97%"
    },
    console: {
      backgroundColor: "#403f3f",
      height: "400px",
      marginLeft: 20,
      marginTop: 20,
      overflowX: "hidden",
      overflowY: "visible",
      padding: 10,
      width: "100%"
    },
    consoleSpan: {
      display: "block",
      position: "relative"
    },
    formControl: {
      margin: theme.spacing.unit,
      marginLeft: 20,
      width: "100%"
    },
    inputConsoleChat: {
      marginTop: 16
    },
    root: {
      flexGrow: 1
    },
    status: {
      marginTop: 10
    }
  });

export interface IConsoleTabProps extends WithStyles<typeof consoleTabStyles> {
  account: Account;
  max?: number;
}

export interface IConsoleTabState {
  messages: IMessage[];
  channel: ChatChannelsMultiEnum;
  content: string;
  characterConnected: boolean;
  status: PlayerStatusEnum;
  showGeneralMessages: boolean;
  showPartyMessages: boolean;
  showGuildMessages: boolean;
  showAllianceMessages: boolean;
  showSaleMessages: boolean;
  showSeekMessages: boolean;
  showNoobMessages: boolean;
}
