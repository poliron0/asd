import { observer } from 'mobx-react';
import * as React from 'react';

import LocationInput from '../components/inputs/LocationInput';
import NameInput from '../components/inputs/NameInput';
import RotatingTypeSelector from '../components/selectors/RotatingTypeSelector';
import SpecialTypeSelector from '../components/selectors/SpecialTypeSelector';
import { RotatingType, SpecialType } from '../Constants';
import { logStore } from '../stores/LogStore';
import RegexListContainer from './RegexListContainer';

export interface MainContainerProps {
}

interface MainContainerState {
}

@observer
export default class MainContainer extends React.Component<MainContainerProps, MainContainerState> {

  constructor() {
    super();
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
        logStore.log.name = name
      }} />

    const locationInput = <LocationInput
      defaultLocation={logStore.log.location}
      onSetLocation={(location: string) => {
        logStore.log.location = location
      }} />

    return (
      <div>
        Does the log contain special line?
          {specialTypeSelector}
        Is the log rotating?
          {rotatingTypeSelector}
        Name: {nameInput}
        <br />
        Location: {locationInput}
        <br />
        Regular expressions:
        {regexList}
        <button onClick={() => logStore.saveLog()}>save</button>
      </div >
    );

  }
}
