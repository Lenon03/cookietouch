import Color from "@/utils/Color";
import React from "react";
import { ChromePicker, CustomPicker } from "react-color";
import reactCSS from "reactcss";

interface IProps {
  disableAlpha?: boolean;
  color?: string;
  onChange?: (color: string) => void;
  onChangeComplete?: (color: string) => void;
}

interface IState {
  color: Color;
  displayColorPicker: boolean;
}

class ColorPicker extends React.Component<IProps, IState> {
  public state: IState = {
    color: new Color(0, 0, 0),
    displayColorPicker: false,
  };

  public componentWillReceiveProps() {
    if (this.props.color !== this.state.color.toHex()) {
      this.setState({ color: new Color(this.props.color) });
    }
  }

  public handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  public handleClose = () => {
    this.setState({ displayColorPicker: false });
  }

  public handleChange = (color) => {
    this.setState({ color: new Color(color.hex) });
    if (this.props.onChange) {
      this.props.onChange(color);
    }
  }

  public handleChangeComplete = (color) => {
    this.setState({ color: new Color(color.hex) });
    if (this.props.onChangeComplete) {
      this.props.onChangeComplete(color);
    }
  }

  public render() {
    const styles = reactCSS({
      default: {
        color: {
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
          borderRadius: "2px",
          height: "20px",
          width: "36px",
        },
        cover: {
          bottom: "0px",
          left: "0px",
          position: "fixed",
          right: "0px",
          top: "0px",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        swatch: {
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          cursor: "pointer",
          display: "inline-block",
          padding: "2px",
        },
      },
    });

    const c = this.state.color;

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <ChromePicker
            disableAlpha={this.props.disableAlpha ? this.props.disableAlpha : false}
            color={ { r: c.r, g: c.g, b: c.b, a: c.a } }
            onChangeComplete={ this.handleChange }
          />
        </div> : null }

      </div>
    );
  }
}

export default ColorPicker;
