import { } from '../components/cards/LogCard';
import { observer } from 'mobx-react';
import * as React from 'react';

import LogFormContainer from './LogFormContainer';
import { logStore } from '../stores/LogStore';
import LogCard from '../components/cards/LogCard';
import LogCardContainer from './LogCardContainer';

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
    return (
      // <LogFormContainer />
      <LogCardContainer />
    );

  }
}
