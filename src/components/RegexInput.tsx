import * as React from 'react';

export interface RegexInputProps {
    onChangeRegexString(regexString: string): void
}

interface RegexInputState {

}

export default class RegexInput extends React.Component<RegexInputProps, RegexInputState> {
    onChangeRegexString(event) {
        this.props.onChangeRegexString(event.target.value)
    }

    render() {
        return (
            <div>
                Expression: <input type="text" onChange={this.onChangeRegexString.bind(this)}/>
            </div>
        );
    }
}