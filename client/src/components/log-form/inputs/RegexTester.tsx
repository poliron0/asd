import * as React from 'react';

export interface RegexTesterProps {
    regexString: string
}

interface RegexTesterState {
    text: string
    isOpen: boolean
}

export default class RegexTester extends React.Component<RegexTesterProps, RegexTesterState> {
    constructor() {
        super()
        this.state = {
            text: '',
            isOpen: false
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

    onChangeVisibility() {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        })
    }
    render() {
        const regex: RegExp = new RegExp(this.props.regexString)
        const isValid = regex.test(this.state.text)
        const textBox =
            <textarea cols={40} rows={3}
                placeholder={'type string to test here'}
                onChange={this.onChangeText.bind(this)}>
            </textarea>

        const isValidText = isValid ?
            <span style={{ color: 'green' }}>Match</span> :
            <span style={{ color: 'red' }}>No match</span>

        return (
            <div >
                <div>
                    <a href='#' onClick={(event) => {
                        event.preventDefault()
                        this.onChangeVisibility()
                    }}>
                        {this.state.isOpen ? 'Close tester' : 'Open tester'}
                    </a>
                </div>

                {this.state.isOpen ? <div>{textBox} <br/> {isValidText}</div> : ''}

            </div>
        );
    }
}