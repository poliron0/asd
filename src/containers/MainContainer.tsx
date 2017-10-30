import { observer } from 'mobx-react';
import * as React from 'react';

import { DataStatus, Paths } from '../auxiliary/Enums';
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

  getComponentFromLocation() {
    switch (routerStore.location) {
      case (Paths.VIEW): case (Paths.MAIN):
        return <LogCardContainer
          onSetEditMode={() => {
            routerStore.goTo(Paths.EDIT)
          }}
        />
      case (Paths.EDIT):
        return <LogFormContainer
          onSaveLog={() => {
            logStore.saveLog(logStore.logList.getAll()[0].id)
          }}
        />
    }
  }
  render() {

    switch (logStore.dataStatus) {
      case (DataStatus.FETCH):
        return <div>Loading...</div>
      case (DataStatus.UPDATE):
        return <div>Updating...</div>
      case (DataStatus.FETCH_ERROR):
        return <div>Fetch error please try again later...</div>
      case (DataStatus.UPDATE_ERROR):
        return <div>Update error please try again later...</div>
      case (DataStatus.FETCH_DONE): case (DataStatus.UPDATE_DONE):
        return this.getComponentFromLocation()
    }
  }

  //   const logFormContainer = <LogFormContainer
  //     onSaveLog={() => {
  //       logStore.saveLog(logStore.logList.getAll()[0].id)
  //     }}
  //   />

  //   const logCardContainer = <LogCardContainer
  //     onSetEditMode={() => {
  //       routerStore.goTo(Paths.EDIT)
  //     }}
  //   />

  //   switch (routerStore.location) {
  //     case (Paths.MAIN):
  //       return logCardContainer
  //     case (Paths.EDIT):
  //       return logFormContainer
  //     case (Paths.VIEW):
  //       return logCardContainer
  //     default:
  //       return logCardContainer
  //   }
  // }
}
