import Color from "@/utils/Color";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { ColorPickerStyle } from "@renderer/pages/AccountsManager/ColorPicker/styles";

export interface IColorPickerProps {
  disableAlpha?: boolean;
  color?: string;
  onChange?: (color: string) => void;
  onChangeComplete?: (color: string) => void;
}

export interface IColorPickerState {
  color: Color;
  displayColorPicker: boolean;
}

export type ColorPickerProps = IColorPickerProps & WithStyles<ColorPickerStyle>;
