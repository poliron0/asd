import * as React from 'react';

export interface RotatingTypeSelectorProps {
  onSetRotating(isRotating: boolean): void
  isRotating: boolean
}

interface RotatingTypeSelectorState {
}

export default class RotatingTypeSelector extends React.Component<RotatingTypeSelectorProps, RotatingTypeSelectorState> {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <input type="radio"
          name="isRotatingLog"
          checked={!this.props.isRotating}
          onChange={() => this.props.onSetRotating(false)} /> no

        <input type="radio"
          name="isRotatingLog"
          checked={this.props.isRotating}
          onChange={() => this.props.onSetRotating(true)} /> yes
      </div>
    );
  }
}