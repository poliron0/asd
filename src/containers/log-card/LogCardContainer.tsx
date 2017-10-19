import { observer } from 'mobx-react';
import * as React from 'react';

import { Paths, DataStatus } from '../../auxiliary/Enums';
import LogCard from '../../components/cards/LogCard';
import { logStore } from '../../stores/LogStore';
import { routerStore } from '../../stores/RouterStore';
import { Card, Button, CardActions, CardContent } from 'material-ui';
import Typography from 'material-ui/Typography';


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

        //Handles fetch and fetch error render
        switch (logStore.dataStatus) {
            case (DataStatus.FETCH):
                return <div>Loading...</div>
            case (DataStatus.FETCH_ERROR):
                return <div>Error occured - please try again later</div>
            default:
                break
        }

        const log = logStore.log
        //In case fetch done smoothly continue to render normally
        return (
            <Card style={{ maxWidth: 300 }}>
                <LogCard log={logStore.log} />
                <CardActions>
                    <Button dense color='primary' onClick={this.setEditMode.bind(this)}>Press to edit</Button>
                </CardActions>
            </Card>
        );
    }
}