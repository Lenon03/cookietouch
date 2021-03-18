import Color from "@/utils/Color";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const colorPickerStyles = (theme: Theme) =>
  createStyles({
    color: {
      borderRadius: "2px",
      height: "20px",
      width: "36px"
    },
    cover: {
      bottom: "0px",
      left: "0px",
      position: "fixed",
      right: "0px",
      top: "0px"
    },
    popover: {
      position: "absolute",
      zIndex: 2
    },
    swatch: {
      background: "#fff",
      borderRadius: "1px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
      cursor: "pointer",
      display: "inline-block",
      padding: "2px"
    }
  });

export interface IColorPickerProps
  extends WithStyles<typeof colorPickerStyles> {
  disableAlpha?: boolean;
  color?: string;
  onChange?: (color: string) => void;
  onChangeComplete?: (color: string) => void;
}

export interface IColorPickerState {
  color: Color;
  displayColorPicker: boolean;
}
