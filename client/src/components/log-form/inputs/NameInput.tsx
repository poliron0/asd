import * as React from 'react';
import { TextField } from 'material-ui';

export interface NameInputProps {
    name: string
    onSetName(name: string): void
    isValid: boolean
    errorMessage: string
}

interface NameInputState {
}

export default class NameInput extends React.Component<NameInputProps, NameInputState> {

    constructor() {
        super()
    }

    onSetName(event) {
        const name: string = event.target.value
        this.props.onSetName(name)
    }

    render() {
        return (

            <TextField
                margin='normal'
                error={!this.props.isValid}
                label="Name"
                value={this.props.name}
                onChange={this.onSetName.bind(this)}
                helperText={this.props.isValid ? '' : this.props.errorMessage}
            />
        );
    }
}