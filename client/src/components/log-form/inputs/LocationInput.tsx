import * as React from 'react';

export interface LocationInputProps {
    location: string
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
            <div>
                <input type="text"
                    value={this.props.location}
                    onChange={this.onSetLocation.bind(this)} />
            </div>
        );
    }
}