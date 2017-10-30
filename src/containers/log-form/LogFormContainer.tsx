import { observer } from 'mobx-react';
import * as React from 'react';

import { DataStatus, Paths } from '../../auxiliary/Enums';
import { isLogValid } from '../../auxiliary/Validators';
import SaveButton from '../../components/SaveButton';
import { Log } from '../../models/Log';
import { routerStore } from '../../stores/RouterStore';
import InputsContainer from './InputsContainer';
import RegexListContainer from './RegexListContainer';
import SelectorsContainer from './SelectorsContainer';

export interface LogFormContainerProps {
    log: Log
    dataStatus: DataStatus
    onSaveLog()
}

interface LogFormContainerState {

}

@observer
export default class LogFormContainer extends React.Component<LogFormContainerProps, LogFormContainerState> {
    constructor() {
        super()
    }

    render() {

        switch (this.props.dataStatus) {
            case (DataStatus.FETCH):
                return <div>Loading...</div>
            case (DataStatus.FETCH_ERROR):
                return <div>Error occured - please try again later</div>
        }

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
            onSetSpecialLine={(isSpecialLine: boolean) => {
                this.props.log.isSpecialLine = isSpecialLine
            }}

            onSetRotating={(isRotating) => {
                this.props.log.isRotating = isRotating
            }}
        />

        const inputs = <InputsContainer />

        const regexList = <RegexListContainer
            regexList={this.props.log.regexList} />

        const saveButton =
            <SaveButton
                disabled={!isLogValid(this.props.log)}
                onSave={() => this.props.onSaveLog()} />

        let message = <span></span>
        switch (this.props.dataStatus) {
            case (DataStatus.UPDATE):
                message = <b>Updating</b>
                break
            case (DataStatus.UPDATE_ERROR):
                message = <b>Updating error occurred - please try again latter</b>
                break
            case (DataStatus.UPDATE_DONE):
                message = <b>Updated successfully</b>
                break
        }

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