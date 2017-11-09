import { Log } from '../../../../../common/models/Log';
import { observer } from 'mobx-react';
import * as React from 'react';

import { isLocationValid, isNameValid } from '../../../../../common/auxiliary/Validators';
import InputError from './InputError';
import LocationInput from './LocationInput';
import NameInput from './NameInput';
import { logStore } from '../../../stores/LogStore';

export interface InputsContainerProps {
    log: Log
}

interface InputsContainerState {
}

@observer
export default class InputsContainer extends React.Component<InputsContainerProps, InputsContainerState> {
    constructor() {
        super()
    }

    render() {

        const log = this.props.log 

        const nameInput = <NameInput
            name={log.name}
            onSetName={(name: string) => {
                log.name = name
            }} />

        const locationInput = <LocationInput
            location={log.location}
            onSetLocation={(location: string) => {
                log.location = location
            }} />

        return (
            <div>
                Name: {nameInput}
                {isNameValid(log.name) ? <span></span> : <InputError
                    errorMessage={'Invalid name - name should contain only english letters'} />}
                <br />
                Location: {locationInput}
                {isLocationValid(log.location) ? <span></span> : <InputError
                    errorMessage={'Please enter a valid linux or windows file path'} />}
            </div>
        );
    }
}