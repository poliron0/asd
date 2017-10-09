import * as React from 'react';

export interface LocationInputProps {
    defaultLocation: string
    onSetLocation(location: string): void
}

interface LocationInputState {
    location: string
}

export default class LocationInput extends React.Component<LocationInputProps, LocationInputState> {
    constructor() {
        super()
        this.state = {
            location: ''
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            location: this.props.defaultLocation
        })
    }

    onSetLocation(event) {
        const location: string = event.target.value
        this.props.onSetLocation(location)
        this.setState({
            ...this.state,
            location
        })
    }

    render() {
        return (
            <div>
                <input type="text"
                    value={this.state.location}
                    onChange={this.onSetLocation.bind(this)} />
            </div>
        );
    }
}