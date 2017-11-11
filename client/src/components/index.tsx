import { logStore } from '../stores/LogStore';
import LogFormContainer from './log-form/LogFormContainer';
import { observer } from 'mobx-react';
import * as React from 'react';

import { Paths } from '../../../common/auxiliary/Enums';
import { LogId } from '../../../common/auxiliary/Types';
import { routerStore } from '../stores/RouterStore';
import AsyncLogForm from './log-form/index';
import AsyncLogList from './log-list';
import { Log } from '../../../common/models/Log';

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
        return <AsyncLogList
          onSetEditMode={(id: LogId) => {
            routerStore.goTo(Paths.EDIT + '/' + id)
          }}
          onAddNewLog={() => {
            routerStore.goTo(Paths.NEW_LOG)
          }} />
      case (Paths.EDIT): {
        return <AsyncLogForm logId={routerStore.location.split('/')[2]} />
      }
      case (Paths.NEW_LOG): {
        return <LogFormContainer
          log={new Log('default', '/default')}
          onSaveLog={(log: Log) => logStore.addLog(log)} />
      }
      default: {
        return <div>
          <div>Page Doesn't exist</div>
          <br />
          <a href='/'>Go to home page</a>
        </div >
      }
    }
  }
  render() {
    return this.getComponentFromLocation()
  }
}
