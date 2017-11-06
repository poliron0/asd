import { observer } from 'mobx-react';
import * as React from 'react';

import { Paths } from '../../auxiliary/Enums';
import { isLogValid } from '../../auxiliary/Validators';
import { Log } from '../../models/Log';
import { routerStore } from '../../stores/RouterStore';
import InputsContainer from './inputs/index';
import RegexListContainer from './regex-list/index';
import SaveButton from './save-button/index';
import SelectorsContainer from './selectors/index';

export interface LogFormContainerProps {
    log: Log
    onSaveLog(log: Log)
}

interface LogFormContainerState {

}

@observer
export default class LogFormContainer extends React.Component<LogFormContainerProps, LogFormContainerState> {
    constructor() {
        super()
    }

    render() {

        let log: Log  = this.props.log

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
                onSave={() => this.props.onSaveLog(log)} />

        let message = <span></span>
        // switch (this.props.dataStatus) {
        //     case (DataStatus.UPDATE):
        //         message = <b>Updating</b>
        //         break
        //     case (DataStatus.UPDATE_ERROR):
        //         message = <b>Updating error occurred - please try again latter</b>
        //         break
        //     case (DataStatus.UPDATE_DONE):
        //         message = <b>Updated successfully</b>
        //         break
        // }

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