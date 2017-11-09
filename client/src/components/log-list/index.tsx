import { observer } from 'mobx-react';
import * as React from 'react';
import Async from 'react-promise';

import { LogId } from '../../../../common/auxiliary/Types';
import { LogList } from '../../../../common/models/LogList';
import { logStore } from '../../stores/LogStore';
import LogListContainer from './LogListContainer';
import { routerStore } from '../../stores/RouterStore';
import { Paths } from '../../../../common/auxiliary/Enums';


export interface AsyncLogListProps {
    onSetEditMode(id: LogId)
    onAddNewLog()
}

interface AsyncLogListState {

}

@observer
export default class AsyncLogList extends React.Component<AsyncLogListProps, AsyncLogListState> {

    render() {

        return <Async
            promise={logStore.fetchAll()}
            then={(result: LogList) => {
                console.log(JSON.stringify(result))
                return <LogListContainer
                    onRemoveLog={(id: LogId) => {
                        return logStore.removeLog(id)
                    }}
                    onSetEditMode={this.props.onSetEditMode}
                    onAddLog={this.props.onAddNewLog}
                />
            }}
            pending={<div>Loading...</div>}
        />
    }
}