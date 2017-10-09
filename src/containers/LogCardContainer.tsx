import { observer } from 'mobx-react';
import * as React from 'react';

import LogCard from '../components/cards/LogCard';
import { logStore } from '../stores/LogStore';

export interface LogCardContainerProps {
}

interface LogCardContainerState {

}

@observer
export default class LogCardContainer extends React.Component<LogCardContainerProps, LogCardContainerState> {
    setEditMode() {

    }

    render() {
        return (
            <div>
                <LogCard log={logStore.log} />
                {/* <button onClick={this.setEditMode.bind(this)}>Press to edit</button> */}
            </div>
        );
    }
}