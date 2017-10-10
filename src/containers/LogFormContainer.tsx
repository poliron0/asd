import { logFormStore } from '../stores/LogFormStore';
import { observer } from 'mobx-react';
import * as React from 'react';

import { logStore } from '../stores/LogStore';
import { viewStore } from '../stores/ViewStore';
import { isLocationValid, isNameValid } from '../auxiliary/Validators';
import InputsContainer from './InputsContainer';
import RegexListContainer from './RegexListContainer';
import SelectorsContainer from './SelectorsContainer';
import ButtonsContainer from './ButtonsContainer';

export interface LogFormContainerProps {
}

interface LogFormContainerState {
    isNameValid: boolean
    isLocationValid: boolean
}

@observer
export default class LogFormContainer extends React.Component<LogFormContainerProps, LogFormContainerState> {
    constructor() {
        super()
        this.state = {
            isNameValid: true,
            isLocationValid: true
        }
    }

    render() {

        const selectors = <SelectorsContainer />
        const inputs = <InputsContainer />
        const regexList = <RegexListContainer regexList={logStore.log.regexList} />
        const buttons = <ButtonsContainer />
    
        return (
            <div>
                {selectors}
                {inputs}
                <br />  
                {regexList}
                {buttons}
                
            </div>
        );
    }
}