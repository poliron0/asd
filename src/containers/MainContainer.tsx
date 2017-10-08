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
    

    return (
      <div>
        <form>
          Does the log contain special line?
          <br />
          <input type="radio" name="isSpecialLineLog" /> yes
          <input type="radio" name="isSpecialLineLog" /> no
          <br />
          Is the log rotating?
          <br />
          <input type="radio" name="isRotatingLog" /> yes
          <input type="radio" name="isRotatingLog" /> no
        </form>
        name: <input type="text" />
        <br />
        location: <input type="text" />
        <br />
        Regular expressions:
        <RegexListContainer regexList={logStore.log.regexList}/>
      </div >
    );

  }
}
