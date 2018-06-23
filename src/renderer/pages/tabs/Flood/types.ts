import Account from "@/account";
import FloodSentence from "@/extensions/flood/FloodSentence";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { FloodTabStyle } from "@renderer/pages/tabs/Flood/styles";

export interface IAddSentenceForm {
  content: string;
  channel: number;
  onPlayerJoined: boolean;
  onPlayerLeft: boolean;
}

export interface IFloodTabProps {
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

export type FloodTabProps = IFloodTabProps & WithStyles<FloodTabStyle>;
