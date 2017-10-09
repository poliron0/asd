import LogCardContainer from './LogCardContainer';
import { observer } from 'mobx-react';
import * as React from 'react';

import LogFormContainer from './LogFormContainer';
import { viewStore } from '../stores/ViewStore';

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
      <div>
        {viewStore.isEditMode ? <LogFormContainer />: <LogCardContainer />}
        {/* <LogFormContainer /> */}
      </div>
    );

  }
}
