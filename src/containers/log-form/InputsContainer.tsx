import { observer } from 'mobx-react';
import * as React from 'react';

import InputError from '../../components/inputs/InputError';
import LocationInput from '../../components/inputs/LocationInput';
import NameInput from '../../components/inputs/NameInput';
import { logFormStore } from '../../stores/LogFormStore';
import { logStore } from '../../stores/LogStore';
import { isLocationValid, isNameValid } from '../../auxiliary/Validators';

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
                logFormStore.isNameValid = isNameValid(name)
                logStore.log.name = name
            }} />

        const locationInput = <LocationInput
            defaultLocation={logStore.log.location}
            onSetLocation={(location: string) => {
                logFormStore.isLocationValid = isLocationValid(location)
                logStore.log.location = location
            }} />

        return (
            <div>
                Name: {nameInput}
                {logFormStore.isNameValid ? <span></span> : <InputError
                    errorMessage={'Invalid name - name should contain only english letters'} />}
                <br />
                Location: {locationInput}
                {logFormStore.isLocationValid ? <span></span> : <InputError
                    errorMessage={'Please enter a valid linux or windows file path'} />}
            </div>
        );
    }
}