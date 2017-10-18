import { observer } from 'mobx-react';
import * as React from 'react';

import { Paths, DataStatus } from '../../auxiliary/Enums';
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
        switch (logStore.dataStatus) {
            case (DataStatus.FETCH):
                return <div>Loading...</div>
            case (DataStatus.DONE):
                return (
                    <div>
                        <LogCard log={logStore.log} />
                        <button onClick={this.setEditMode.bind(this)}>Press to edit</button>
                    </div>
                )
            case(DataStatus.ERROR):
                return <div>Error occured - please try again later</div>
        }
        return (
            <div>
                <LogCard log={logStore.log} />
                <button onClick={this.setEditMode.bind(this)}>Press to edit</button>
            </div>
        );
    }
}