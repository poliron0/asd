import { observer } from 'mobx-react';
import * as React from 'react';

import { isLocationValid, isNameValid } from '../../auxiliary/Validators';
import { logStore } from '../../stores/LogStore';
import ButtonsContainer from './ButtonsContainer';
import InputsContainer from './InputsContainer';
import RegexListContainer from './RegexListContainer';
import SelectorsContainer from './SelectorsContainer';

export interface LogFormContainerProps {
}

interface LogFormContainerState {

}

@observer
export default class LogFormContainer extends React.Component<LogFormContainerProps, LogFormContainerState> {
    constructor() {
        super()
    }

    render() {

        const instructions =
            <div>
                <b>Please fill out the form by the following rules:</b>
                <ol>
                    <li>Valid log name should contain only english letters</li>
                    <li>Valid log location should be a valid linux/windows file path</li>
                    <li>Each regular expression should be a valid javascript regular expression string</li>
                </ol>
            </div>

        const selectors = <SelectorsContainer />
        const inputs = <InputsContainer />
        const regexList = <RegexListContainer regexList={logStore.log.regexList} />
        const buttons = <ButtonsContainer />

        return (
            <div>
                {instructions}
                {selectors}
                {inputs}
                <br />
                {regexList}
                {buttons}

            </div>
        );
    }
}