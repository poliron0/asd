import { observer } from 'mobx-react';
import * as React from 'react';
import Async from 'react-promise';

import { LogId } from '../../../../common/auxiliary/Types';
import { Log } from '../../../../common/models/Log';
import { logStore } from '../../stores/LogStore';
import LogFormContainer from './container/index';

interface AsyncLogFormProps {
    logId: LogId
}

interface AsyncLogFormState {

}

@observer
export default class AsyncLogForm extends React.Component<AsyncLogFormProps, AsyncLogFormState> {
    constructor() {
        super()
    }

    render() {
        const LogAsync = Async as { new (): Async<Log> }        
        return <LogAsync promise={logStore.fetchLog(this.props.logId)}
            then={
                (result: Log) => {
                    console.log(JSON.stringify(result))
                    return <LogFormContainer
                        log={result}
                        onSaveLog={(log: Log) => logStore.updateLog(log)}
                    />
                }
            }
            catch={err => {
                return <div>
                    {err.response.data.err}
                    <br/>
                    <a href='/'>Go to home page</a>
                </div >
            }}
            pending={<div>Loading...</div>}
        />

    }
}