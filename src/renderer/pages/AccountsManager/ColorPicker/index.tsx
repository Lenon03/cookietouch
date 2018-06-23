import Color from "@/utils/Color";
import withStyles from "@material-ui/core/styles/withStyles";
import { colorPickerStyles } from "@renderer/pages/AccountsManager/ColorPicker/styles";
import {
  ColorPickerProps,
  IColorPickerProps,
  IColorPickerState
} from "@renderer/pages/AccountsManager/ColorPicker/types";
import React from "react";
import { ChromePicker } from "react-color";

class ColorPicker extends React.Component<ColorPickerProps, IColorPickerState> {
  public state: IColorPickerState = {
    color: new Color(0, 0, 0),
    displayColorPicker: false
  };

  public componentWillReceiveProps() {
    if (this.props.color !== this.state.color.toHex()) {
      this.setState({ color: new Color(this.props.color) });
    }
  }

  public render() {
    const c = this.state.color;
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.swatch} onClick={this.handleClick}>
          <div
            className={classes.color}
            style={{
              background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${
                this.state.color.b
              }, ${this.state.color.a})`
            }}
          />
        </div>
        {this.state.displayColorPicker ? (
          <div className={classes.popover}>
            <div className={classes.cover} onClick={this.handleClose} />
            <ChromePicker
              disableAlpha={
                this.props.disableAlpha ? this.props.disableAlpha : false
              }
              color={{ r: c.r, g: c.g, b: c.b, a: c.a }}
              onChange={this.handleChange}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
        ) : null}
      </div>
    );
  }

  private handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  private handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  private handleChange = color => {
    this.setState({ color: new Color(color.hex) });
    if (this.props.onChange) {
      this.props.onChange(color);
    }
  };

  private handleChangeComplete = color => {
    this.setState({ color: new Color(color.hex) });
    if (this.props.onChangeComplete) {
      this.props.onChangeComplete(color);
    }
  };
}

export default withStyles(colorPickerStyles)<IColorPickerProps>(ColorPicker);
