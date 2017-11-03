import { Button, Grid } from 'material-ui';
import { observer } from 'mobx-react';
import * as React from 'react';

import { LogId } from '../../auxiliary/Types';
import LogCard from './LogCard';
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

        const addInput =
            <Grid item>
                <Button raised color='primary' onClick={() => {
                    let log = new Log('', '/c')
                    logStore.logList.add(log)
                    this.props.onSetEditMode(log.id)
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