import Account from "@/account";
import { IMessage } from "@/core/logger";
import { ChatChannelsMultiEnum } from "@/protocol/enums/ChatChannelsMultiEnum";
import { PlayerStatusEnum } from "@/protocol/enums/PlayerStatusEnum";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { ConsoleTabStyle } from "@renderer/pages/tabs/Console/styles";

export interface IConsoleTabProps {
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

export type ConsoleTabProps = IConsoleTabProps & WithStyles<ConsoleTabStyle>;
