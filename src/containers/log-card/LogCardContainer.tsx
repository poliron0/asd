import { observer } from 'mobx-react';
import * as React from 'react';

import { Paths } from '../../auxiliary/Enums';
import LogCard from '../../components/cards/LogCard';
import { logStore } from '../../stores/LogStore';
import { routerStore } from '../../stores/RouterStore';

export interface LogCardContainerProps {
}

interface LogCardContainerState {

}

@observer
export default class LogCardContainer extends React.Component<LogCardContainerProps, LogCardContainerState> {
    setEditMode() {
        routerStore.goTo(Paths.EDIT)
    }

    render() {
        return (
            <div>
                <LogCard log={logStore.log} />
                <button onClick={this.setEditMode.bind(this)}>Press to edit</button>
            </div>
        );
    }
}