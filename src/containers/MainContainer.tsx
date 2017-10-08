import RotatingTypeSelector from '../components/selectors/RotatingTypeSelector';
import SpecialTypeSelector from '../components/selectors/SpecialTypeSelector';
import { } from '../components/selectors/SpecialLineSelector';
import { observer } from 'mobx-react';
import * as React from 'react';

import { Log } from '../models/Log';
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
    logStore.setLog(new Log('a', '/'))
  }

  render() {

    const regexList = <RegexListContainer regexList={logStore.log.regexList} />
    const specialTypeSelector = <SpecialTypeSelector
      onSetSpecial={(isSpecialLine: boolean) => {
        logStore.log.isSpecialLine = isSpecialLine
      }} />

    const rotatingTypeSelector = <RotatingTypeSelector
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
      </div >
    );

  }
}
