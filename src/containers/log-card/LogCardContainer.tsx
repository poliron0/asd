import { observer } from 'mobx-react';
import * as React from 'react';

import { LogId } from '../../auxiliary/Types';
import LogCard from '../../components/cards/LogCard';
import { Log } from '../../models/Log';
import { logStore } from '../../stores/LogStore';


export interface LogCardContainerProps {
    onRemoveLog(id: LogId)
    onSetEditMode(id: LogId)
}

interface LogCardContainerState {

}

@observer
export default class LogCardContainer extends React.Component<LogCardContainerProps, LogCardContainerState> {

    render() {
        
        const addInput = <div>
            <button onClick={() => {
                let log = new Log('', '/c')
                logStore.logList.add(log)
                this.props.onSetEditMode(log.id)
            }}>Add new log</button>
        </div>
        const logList = logStore.logList.getAll().map(log => <LogCard
            key={log.id}
            log={log}
            onSetEditMode={() => this.props.onSetEditMode(log.id)} />)
        return (
            <div>
                {addInput}
                {logList}
            </div>
        )
    }
}