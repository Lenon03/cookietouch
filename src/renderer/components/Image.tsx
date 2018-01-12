import * as React from "react";

interface IImageProps {
  src: string;
  width?: number;
  height?: number;
  style?: any;
  mode?: string;
}

export default class Image extends React.Component<IImageProps, {}> {

  constructor(props: IImageProps) {
    super(props);
  }

  public render() {
    const modes = {
      fill: "cover",
      fit: "contain",
    };

    const size = modes[this.props.mode] || "contain";

    const defaults = {
      backgroundColor: "gray",
      height: this.props.height || 100,
      width: this.props.width || 100,
    };

    const important = {
      backgroundImage: `url("${this.props.src}")`,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundSize: size,
    };

    const merged = {};
    Object.assign(merged, defaults, this.props.style, important);

    return <div {...this.props} style={merged} />;
  }
}
