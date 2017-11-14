import * as React from 'react';
import { TextField } from 'material-ui';

export interface LocationInputProps {
    location: string
    isValid: boolean
    errorMessage: string
    onSetLocation(location: string): void
}

interface LocationInputState {
}

export default class LocationInput extends React.Component<LocationInputProps, LocationInputState> {
    constructor() {
        super()
    }

    onSetLocation(event) {
        const location: string = event.target.value
        this.props.onSetLocation(location)
    }

    render() {
        return (
            <TextField
                margin='normal'
                error={!this.props.isValid}
                label="Location"
                value={this.props.location}
                onChange={this.onSetLocation.bind(this)}
                helperText={this.props.isValid ? '' : this.props.errorMessage}
            />
        );
    }
}