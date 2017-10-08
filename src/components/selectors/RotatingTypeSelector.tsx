import * as React from 'react';

export interface RotatingTypeSelectorProps {
  onSetRotating(isRotating: boolean): void
}

interface RotatingTypeSelectorState {
  isRotating: RotatingType
}

enum RotatingType {
  NOT_ROTATING = "0",
  ROTATING = "1"
}

export default class RotatingTypeSelector extends React.Component<RotatingTypeSelectorProps, RotatingTypeSelectorState> {
  constructor() {
    super()
    this.state = {
      isRotating: RotatingType.NOT_ROTATING
    }
  }
  onSetSpecial(event) {
    let rotatingType = event.target.value

    switch (rotatingType) {
      case (RotatingType.ROTATING):
        this.props.onSetRotating(true)
        break
      case (RotatingType.NOT_ROTATING):
        this.props.onSetRotating(false)
        break
      default:
        this.props.onSetRotating(true)
    }

    this.setState({
      ...this.state,
      isRotating: rotatingType
    })
  }
  render() {
    return (
      <div>
        <form onChange={this.onSetSpecial.bind(this)}>
          <input type="radio"
            value={RotatingType.NOT_ROTATING}
            name="isRotatingLog"
            checked={this.state.isRotating == RotatingType.NOT_ROTATING} /> no

            <input type="radio"
            value={RotatingType.ROTATING}
            name="isRotatingLog"
            checked={this.state.isRotating == RotatingType.ROTATING} /> yes
            </form>
      </div>
    );
  }
}