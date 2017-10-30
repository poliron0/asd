import { observer } from 'mobx-react';
import * as React from 'react';

import { DataStatus } from '../../auxiliary/Enums';
import LogCard from '../../components/cards/LogCard';
import { Log } from '../../models/Log';


export interface LogCardContainerProps {
    dataStatus: DataStatus
    log: Log
    onSetEditMode()
}

interface LogCardContainerState {

}

@observer
export default class LogCardContainer extends React.Component<LogCardContainerProps, LogCardContainerState> {

    render() {

        const log = this.props.log
        const dataStatus = this.props.dataStatus
        //Handles fetch and fetch error render
        switch (dataStatus) {
            case (DataStatus.FETCH):
                return <div>Loading...</div>
            case (DataStatus.FETCH_ERROR):
                return <div>Error occured - please try again later</div>
            default:
                break
        }

        //In case fetch done smoothly continue to render normally
        return (
            <LogCard log={log} onSetEditMode={this.props.onSetEditMode} />
        );
    }
}