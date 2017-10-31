import { Button, Grid } from 'material-ui';
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

        const addInput =
            <Grid container justify="center" xs={12} style={{ marginTop: '1em' }}>
                <Button raised color='primary' onClick={() => {
                    let log = new Log('', '/c')
                    logStore.logList.add(log)
                    this.props.onSetEditMode(log.id)
                }}>Add new log</Button>
            </Grid>

        const logList = logStore.logList.getAll().map(log => <Grid container justify="center" xs={12} style={{ marginTop: '1em' }}>
            <LogCard
                key={log.id}
                log={log}
                onRemove={() => this.props.onRemoveLog(log.id)}
                onSetEditMode={() => this.props.onSetEditMode(log.id)} />
        </Grid>)
        return (
            <Grid>
                {addInput}
                {logList }
            </Grid>
        )
    }
}