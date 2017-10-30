import { observer } from 'mobx-react';
import * as React from 'react';

import { Paths } from '../auxiliary/Enums';
import { logStore } from '../stores/LogStore';
import { routerStore } from '../stores/RouterStore';
import LogCardContainer from './log-card/LogCardContainer';
import LogFormContainer from './log-form/LogFormContainer';

export interface MainContainerProps {
}

interface MainContainerState {
}

@observer
export default class MainContainer extends React.Component<MainContainerProps, MainContainerState> {

  constructor() {
    super()
  }

  render() {
    const logFormContainer = <LogFormContainer
      log={logStore.log}
      dataStatus={logStore.dataStatus}
      onSaveLog={() => {
        logStore.saveLog()
      }}
    />
    
    const logCardContainer = <LogCardContainer 
      onSetEditMode={() => {
        routerStore.goTo(Paths.EDIT)
      }}
      dataStatus={logStore.dataStatus}
      log={logStore.log}
    />
    
    switch (routerStore.location) {
      case (Paths.MAIN):
        return logCardContainer
      case (Paths.EDIT):
        return logFormContainer
      case (Paths.VIEW):
        return logCardContainer
      default:
        return logCardContainer
    }
  }
}
