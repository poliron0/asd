import { observer } from 'mobx-react';
import * as React from 'react';

import LogCard from '../../components/cards/LogCard';
import { logStore } from '../../stores/LogStore';
import { Log } from '../../models/Log';


export interface LogCardContainerProps {
    onSetEditMode()
}

interface LogCardContainerState {

}

@observer
export default class LogCardContainer extends React.Component<LogCardContainerProps, LogCardContainerState> {

    render() {

        return (
            logStore.logList.getAll().map(log => <LogCard
                key={log.id}
                log={log}
                onSetEditMode={this.props.onSetEditMode} />)
        )
    }
}