import * as React from 'react';
import { Log } from '../../models/Log';
import { LogRegex } from '../../models/LogRegex';

export interface LogCardProps {
    log: Log
}

interface LogCardState {

}

export default class LogCard extends React.Component<LogCardProps, LogCardState> {
    render() {
        const log = this.props.log
        const regularExpressionsList = log.regexList.getAll().length ?
            <ol>
                {log.regexList.getAll().map((logRegex, index) =>
                    <li key={logRegex.id}>{logRegex.exp}</li>
                )}
            </ol> : <i>No regular espressions added yet!</i>


        return (
            <div>
                <b>Does the log contain a special line?</b> {log.isSpecialLine ? 'yes' : 'no'}
                <br />
                <b>Is is a rotating log:</b> {log.isRotating ? 'yes' : 'no'}
                <br />
                <b>Name:</b> {log.name}
                <br />
                <b>Location:</b> {log.location}
                <br />
                <b>Regular expressions to capture:</b> {regularExpressionsList}

            </div>
        );
    }
}