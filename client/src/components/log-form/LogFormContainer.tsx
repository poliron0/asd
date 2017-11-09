import { observer } from 'mobx-react';
import * as React from 'react';

import { Paths } from '../../../../common/auxiliary/Enums';
import { isLogValid } from '../../../../common/auxiliary/Validators';
import { Log } from '../../../../common/models/Log';
import { routerStore } from '../../stores/RouterStore';
import InputsContainer from './inputs/index';
import RegexListContainer from './regex-list/index';
import SaveButton from './save-button/index';
import SelectorsContainer from './selectors/index';

export interface LogFormContainerProps {
    log: Log
    onSaveLog(log: Log): Promise<Log>
}

interface LogFormContainerState {
    message: string
}

@observer
export default class LogFormContainer extends React.Component<LogFormContainerProps, LogFormContainerState> {
    constructor() {
        super()
        this.state = {
            message: ''
        }
    }

    setMessage(message: string) {
        this.setState({
            ...this.state,
            message
        })
    }

    saveLog() {
        this.setMessage('Updating')
        this.props.onSaveLog(this.props.log)
            .then(_ => {
                this.setMessage('Updated succesfuly')
            })
            .catch(err => {
                this.setMessage('Error occured - please try again later')
            })
    }

    render() {

        let log: Log = this.props.log

        const instructions =
            <div>
                <b>Please fill out the form by the following rules:</b>
                <ol>
                    <li>Valid log name should contain only english letters</li>
                    <li>Valid log location should be a valid linux/windows file path</li>
                    <li>Each regular expression should be a valid javascript regular expression string</li>
                </ol>
            </div>
        const backToSummaryLink =
            <a href={'#'} onClick={(event) => {
                routerStore.goTo(Paths.VIEW)
            }}>Back to Summary</a>


        const selectors = <SelectorsContainer
            log={log}
            onSetSpecialLine={(isSpecialLine: boolean) => {
                log.isSpecialLine = isSpecialLine
            }}

            onSetRotating={(isRotating) => {
                log.isRotating = isRotating
            }}
        />

        const inputs = <InputsContainer
            log={log}
        />

        const regexList = <RegexListContainer
            regexList={log.regexList} />

        const saveButton =
            <SaveButton
                disabled={!isLogValid(log)}
                onSave={() => this.saveLog()} />

        let message = <span>{this.state.message}</span>

        return (
            <div>
                {backToSummaryLink}
                {instructions}
                {selectors}
                {inputs}
                <br />
                {regexList}
                {saveButton}
                {message}
            </div>
        );
    }
}