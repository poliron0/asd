import { observer } from 'mobx-react';
import * as React from 'react';

import InputError from '../components/inputs/InputError';
import LocationInput from '../components/inputs/LocationInput';
import NameInput from '../components/inputs/NameInput';
import RotatingTypeSelector from '../components/selectors/RotatingTypeSelector';
import SpecialTypeSelector from '../components/selectors/SpecialTypeSelector';
import { RotatingType, SpecialType } from '../Constants';
import { logStore } from '../stores/LogStore';
import { viewStore } from '../stores/ViewStore';
import { isLocationValid, isNameValid } from '../Validators';
import RegexListContainer from './RegexListContainer';

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
        const regexList = <RegexListContainer regexList={logStore.log.regexList} />

        const specialTypeSelector = <SpecialTypeSelector
            defaultType={logStore.log.isSpecialLine ? SpecialType.SPECIAL : SpecialType.NOT_SPECIAL}
            onSetSpecial={(isSpecialLine: boolean) => {
                logStore.log.isSpecialLine = isSpecialLine
            }} />

        const rotatingTypeSelector = <RotatingTypeSelector
            defaultType={logStore.log.isRotating ? RotatingType.ROTATING : RotatingType.NOT_ROTATING}
            onSetRotating={(isRotating: boolean) => {
                logStore.log.isRotating = isRotating
            }} />


        const nameInput = <NameInput
            defaultName={logStore.log.name}
            onSetName={(name: string) => {
                this.setState({
                    ...this.state,
                    isNameValid: isNameValid(name)
                })
                logStore.log.name = name
            }} />

        const locationInput = <LocationInput
            defaultLocation={logStore.log.location}
            onSetLocation={(location: string) => {
                this.setState({
                    ...this.state,
                    isLocationValid: isLocationValid(location)
                })
                logStore.log.location = location
            }} />

        return (
            <div>
                Does the log contain special line?
                {specialTypeSelector}
                Is the log rotating?
                {rotatingTypeSelector}
                Name: {nameInput}
                {this.state.isNameValid ? <span></span> : <InputError
                    errorMessage={'Invalid name - name should contain only english letters'} />}
                <br />
                Location: {locationInput}
                {this.state.isLocationValid ? <span></span> : <InputError
                    errorMessage={'Please enter a valid linux or windows file path'} />}
                <br />
                Regular expressions:
                {regexList}
                <button
                    onClick={() => logStore.saveLog()}
                    disabled={!this.state.isLocationValid || !this.state.isNameValid}>
                        Save
                </button>
                <button
                    onClick={() => {
                        logStore.saveLog()
                        viewStore.isEditMode = false
                    }}
                    disabled={!this.state.isLocationValid || !this.state.isNameValid}>
                      Save and close
                </button>
            </div>
        );
    }
}