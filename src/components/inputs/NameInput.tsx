import * as React from 'react';

export interface NameInputProps {
    defaultName: string
    onSetName(name: string): void
}

interface NameInputState {
    name: string
}

export default class NameInput extends React.Component<NameInputProps, NameInputState> {

    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            name: this.props.defaultName
        })
    }

    onSetName(event) {
        const name: string = event.target.value
        this.props.onSetName(name)
        this.setState({
            ...this.state,
            name
        })
    }

    render() {
        return (
            <div>
                <input type="text"
                    value={this.state.name}
                    onChange={this.onSetName.bind(this)} />
            </div>
        );
    }
}