import { Button, Grid } from 'material-ui';
import { observer } from 'mobx-react';
import * as React from 'react';

import { LogId } from '../../auxiliary/Types';
import LogCard from './LogCard';
import { Log } from '../../models/Log';
import { logStore } from '../../stores/LogStore';
import { routerStore } from '../../stores/RouterStore';


export interface LogListContainerProps {
    onRemoveLog(id: LogId): Promise<Log>
    onSetEditMode(id: LogId): void
    onAddLog()
}

interface LogListContainerState {

}

@observer
export default class LogListContainer extends React.Component<LogListContainerProps, LogListContainerState> {

    render() {

        const addInput =
            <Grid item>
                <Button raised color='primary' onClick={() => {
                    this.props.onAddLog()
                }}>Add new log</Button>
            </Grid>

        const logList = logStore.logList.getAll().map(log =>
            <Grid item key={log.id}>
                <LogCard
                    log={log}
                    onRemove={() => this.props.onRemoveLog(log.id)}
                    onSetEditMode={() => this.props.onSetEditMode(log.id)} />
            </Grid>
        )
        return (
            <Grid container justify='center' direction='column' alignItems='center'>
                {addInput}
                {logList}
            </Grid>
        )
    }
}