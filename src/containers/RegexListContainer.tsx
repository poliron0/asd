import { observer } from 'mobx-react';
import * as React from 'react';

import RegexInput from '../components/inputs/RegexInput';
import { LogRegex } from '../models/LogRegex';

export interface RegexListContainerProps {
    regexList: Array<LogRegex>
}

interface RegexListContainerState {

}

@observer
export default class RegexListContainer extends React.Component<RegexListContainerProps, RegexListContainerState> {

    onChangeRegexString(id: string, regexString: string) {
        this.props.regexList.map(regex => {
            if (regex.id === id) {
                regex.setExp(regexString)
            }

            return regex
        })
    }

    onRemoveRegex(id: string) {
        this.props.regexList.filter(regex => regex.id != id)
    }

    onAddRegex(regex: LogRegex) {
        this.props.regexList.unshift(regex)
    }

    render() {

        const addButton =
            <button onClick={(event) => this.onAddRegex(new LogRegex(''))}>
                Add
            </button>

        const inputs = this.props.regexList.map(logRegex =>
            <RegexInput
                key={logRegex.id}
                defaultString={logRegex.exp}
                onRemoveRegex={() => this.onRemoveRegex(logRegex.id)}
                onChangeRegexString={(regexString: string) => this.onChangeRegexString(logRegex.id, regexString)} />
        )

        return (
            <div>
                {addButton}
                {inputs}
            </div>
        );
    }
}