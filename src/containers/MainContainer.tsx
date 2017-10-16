import { observer } from 'mobx-react';
import * as React from 'react';

import { Paths } from '../auxiliary/Enums';
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
    switch (routerStore.location) {
      case (Paths.MAIN):
        return <LogCardContainer />
      case (Paths.EDIT):
        return <LogFormContainer />
      case (Paths.VIEW):
        return <LogCardContainer />
      default:
        return <LogCardContainer />
    }
  }
}
