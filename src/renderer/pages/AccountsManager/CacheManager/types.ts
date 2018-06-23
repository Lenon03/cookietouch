import { WithStyles } from "@material-ui/core/styles/withStyles";
import { CacheManagerStyle } from "@renderer/pages/AccountsManager/CacheManager/styles";

export interface ICacheManagerProps {
  //
}

export interface ICacheManagerState {
  cacheSize: number;
}

export type CacheManagerProps = ICacheManagerProps &
  WithStyles<CacheManagerStyle>;
