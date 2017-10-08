import * as React from 'react';

export interface RegexInputProps {
    defaultString: string
    onChangeRegexString(regexString: string): void
    onRemoveRegex(): void
}

interface RegexInputState {
    regexString: string
}

export default class RegexInput extends React.Component<RegexInputProps, RegexInputState> {
    onChangeRegexString(event) {
        const regexString = event.target.value
        this.props.onChangeRegexString(regexString)
        this.setState({
            ...this.state,
            regexString
        })
    }

    constructor() {
        super()
        this.state ={
            regexString: ''
        }
    }
    componentDidMount() {
        this.setState({
            ...this.state,
            regexString: this.props.defaultString
        })
    }
    render() {
        return (
            <div>
                Expression: 
                <input
                    type="text"
                    onChange={this.onChangeRegexString.bind(this)} 
                    value={this.state.regexString} />
            </div>
        );
    }
}