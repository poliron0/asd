import * as React from 'react';

export interface InputErrorProps {
    errorMessage: string
}

interface InputErrorState {

}

export default class InputError extends React.Component<InputErrorProps, InputErrorState> {
  render() {
    return (
      <span style={{color: 'red'}}>
        {this.props.errorMessage}
      </span>
    );
  }
}