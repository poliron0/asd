import { observer } from 'mobx-react';
import * as React from 'react';

import { DataStatus, Paths } from '../auxiliary/Enums';
import { logStore } from '../stores/LogStore';
import { routerStore } from '../stores/RouterStore';
import LogCardContainer from './log-list/index';
import LogFormContainer from './log-form/index';
import { LogId } from '../auxiliary/Types';
import { Log } from '../models/Log';

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
    switch (routerStore.route) {
      case (Paths.VIEW): case (Paths.MAIN):
        return <LogCardContainer
          onRemoveLog={(id: LogId)=> {
            logStore.removeLog(id)
          }}
          onSetEditMode={(id: LogId) => {
            routerStore.goTo(Paths.EDIT + '/' + id)
          }}
        />
      case (Paths.EDIT):
        let logId: LogId = routerStore.location.split('/')[2]
        let log: Log = logStore.logList.get(logId)

        return <LogFormContainer
          log={log}
          onSaveLog={() => {
            logStore.saveLog(log.id)
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
}
