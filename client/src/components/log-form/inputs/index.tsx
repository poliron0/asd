import { FormControl, FormGroup } from 'material-ui';
import { observer } from 'mobx-react';
import * as React from 'react';

import { Log } from '../../../../../common/models/Log';
import LocationInput from './LocationInput';
import NameInput from './NameInput';
import { isNameValid, isLocationValid } from '../../../../../common/auxiliary/Validators';

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
            }}
            isValid={isNameValid(log.name)}
            errorMessage={'Name should contain only english letters'}
        />

        const locationInput = <LocationInput
            location={log.location}
            onSetLocation={(location: string) => {
                log.location = location
            }}
            isValid={isLocationValid(log.location)}
            errorMessage={'Location should be a valid linux/windows path'}
        />

        return (
            <FormControl>
                <FormGroup>
                    {nameInput}
                    {locationInput}
                </FormGroup>
            </FormControl>
        );
    }
}