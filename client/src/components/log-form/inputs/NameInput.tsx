import * as React from 'react';

export interface NameInputProps {
    name: string
    onSetName(name: string): void
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
            <div>
                <input type="text"
                    value={this.props.name}
                    onChange={this.onSetName.bind(this)} />
            </div>
        );
    }
}