import * as React from 'react';

export interface RegexInputProps {
    regexString: string
    onChangeRegexString(regexString: string): void
    onRemoveRegex(): void
}

interface RegexInputState {
}

export default class RegexInput extends React.Component<RegexInputProps, RegexInputState> {
    
    onRemoveRegex() {
        this.props.onRemoveRegex()
    }

    onChangeRegexString(event) {
        this.props.onChangeRegexString(event.target.value)
    }

    constructor() {
        super()
    }

    render() {
        return (
            <li>
                <input
                    type="text"
                    onChange={this.onChangeRegexString.bind(this)} 
                    value={this.props.regexString} />
                {' '} <button onClick={this.onRemoveRegex.bind(this)}>Remove regex</button>
            </li>
        );
    }
}