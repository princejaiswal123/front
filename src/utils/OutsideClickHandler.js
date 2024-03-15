import React, { createRef } from "react";

class OutsideClickHandler extends React.Component {
  wrapperRef = createRef();
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("mouseleave", this.handleMouseLeave);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.props.onClick();
    }
  };
  render() {
    return <div className="" ref={this.wrapperRef}>{this.props.children}</div>;
  }
}

export default OutsideClickHandler;
