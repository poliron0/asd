import RotatingTypeSelector from '../components/selectors/RotatingTypeSelector';
import SpecialTypeSelector from '../components/selectors/SpecialTypeSelector';
import { } from '../components/selectors/SpecialLineSelector';
import { observer } from 'mobx-react';
import * as React from 'react';

import { Log } from '../models/Log';
import { logStore } from '../stores/LogStore';
import RegexListContainer from './RegexListContainer';
import { SpecialType, RotatingType } from '../Constants';

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
      defaultType = {logStore.log.isSpecialLine ? SpecialType.SPECIAL : SpecialType.NOT_SPECIAL}
      onSetSpecial={(isSpecialLine: boolean) => {
        logStore.log.isSpecialLine = isSpecialLine
      }} />

    const rotatingTypeSelector = <RotatingTypeSelector
      defaultType = {logStore.log.isRotating ?  RotatingType.ROTATING : RotatingType.NOT_ROTATING}
      onSetRotating={(isRotating: boolean) => {
        logStore.log.isRotating = isRotating
      }} />

    return (
      <div>
        Does the log contain special line?
          {specialTypeSelector}
        Is the log rotating?
          {rotatingTypeSelector}
        name: <input type="text" />
        <br />
        location: <input type="text" />
        <br />
        Regular expressions:
        {regexList}
        <button onClick={() => logStore.saveLog()}>save</button>
      </div >
    );

  }
}
