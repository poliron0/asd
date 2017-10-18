import { observer } from 'mobx-react';
import * as React from 'react';

import { isLocationValid, isNameValid } from '../../auxiliary/Validators';
import InputError from '../../components/inputs/InputError';
import LocationInput from '../../components/inputs/LocationInput';
import NameInput from '../../components/inputs/NameInput';
import { logStore } from '../../stores/LogStore';

export interface InputsContainerProps {
}

interface InputsContainerState {
}

@observer
export default class InputsContainer extends React.Component<InputsContainerProps, InputsContainerState> {
    constructor() {
        super()
    }

    render() {
        const nameInput = <NameInput
            defaultName={logStore.log.name}
            onSetName={(name: string) => {
                logStore.log.name = name
            }} />

        const locationInput = <LocationInput
            defaultLocation={logStore.log.location}
            onSetLocation={(location: string) => {
                logStore.log.location = location
            }} />

        return (
            <div>
                Name: {nameInput}
                {isNameValid(logStore.log.name) ? <span></span> : <InputError
                    errorMessage={'Invalid name - name should contain only english letters'} />}
                <br />
                Location: {locationInput}
                {isLocationValid(logStore.log.location) ? <span></span> : <InputError
                    errorMessage={'Please enter a valid linux or windows file path'} />}
            </div>
        );
    }
}