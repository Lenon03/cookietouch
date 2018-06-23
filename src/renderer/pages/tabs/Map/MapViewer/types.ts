import Account from "@/account";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { MapViewerStyle } from "@renderer/pages/tabs/Map/MapViewer/styles";

export interface IMapViewerProps {
  account: Account;
}

export interface IMapViewerState {
  path: number[];
  selectedCellId: number;
  showCellIds: boolean;
  showReal: boolean;
}

export type MapViewerProps = IMapViewerProps & WithStyles<MapViewerStyle>;
