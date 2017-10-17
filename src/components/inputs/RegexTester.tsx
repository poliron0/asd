import * as React from 'react';

export interface RegexTesterProps {
    regexString: string
}

interface RegexTesterState {
    text: string
}

export default class RegexTester extends React.Component<RegexTesterProps, RegexTesterState> {
    constructor() {
        super()
        this.state = {
            text: ''
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            text: this.props.regexString
        })
    }

    onChangeText(event) {
        this.setState({
            ...this.state,
            text: event.target.value
        })
    }

    render() {
        const regex: RegExp = new RegExp(this.props.regexString)
        const isValid = regex.test(this.state.text)

        return (
            <div>
                <textarea cols={40} rows={3}
                    placeholder={'type string to test here'}
                    onChange={this.onChangeText.bind(this)}>
                </textarea>
                <br/>
                {isValid ?
                    <span style={{ color: 'green' }}>Match</span> :
                    <span style={{ color: 'red' }}>No match</span>}

            </div>
        );
    }
}