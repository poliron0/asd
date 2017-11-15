import {FormControlLabel} from 'material-ui';
import Switch from 'material-ui/Switch';
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
      <FormControlLabel
        control={<Switch
          checked={this.props.isRotating}
          onChange={(event) => this.props.onSetRotating(!this.props.isRotating)}
        />}
        label="Is the log rotating?"
      />

    );
  }
}