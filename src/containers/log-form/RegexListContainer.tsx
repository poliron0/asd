import { observer } from 'mobx-react';
import * as React from 'react';

import { LogRegexId } from '../../auxiliary/Types';
import { isRegexValid } from '../../auxiliary/Validators';
import InputError from '../../components/inputs/InputError';
import RegexInput from '../../components/inputs/RegexInput';
import RegexTester from '../../components/inputs/RegexTester';
import { LogRegex } from '../../models/LogRegex';
import { RegexList } from '../../models/RegexList';
import { logFormStore } from '../../stores/LogFormStore';

export interface RegexListContainerProps {
    regexList: RegexList
}

interface RegexListContainerState {

}

@observer
export default class RegexListContainer extends React.Component<RegexListContainerProps, RegexListContainerState> {

    onChangeRegexString(id: LogRegexId, regexString: string) {
        logFormStore.setRegexValid(id, isRegexValid(regexString))
        this.props.regexList.getAll().map(regex => {
            if (regex.id === id) {
                regex.setExp(regexString)
            }

            return regex
        })
    }

    onRemoveRegex(id: LogRegexId) {
        logFormStore.removeRegex(id)
        this.props.regexList.remove(id)
    }

    onAddRegex(regex: LogRegex) {
        logFormStore.setRegexValid(regex.id, true)
        this.props.regexList.add(regex)
    }

    render() {

        const addButton =
            <button onClick={(event) => this.onAddRegex(new LogRegex(''))}>
                Add regular expression
            </button>

        const inputError = <InputError errorMessage={'Please enter a valid javascript regex!'} />

        const inputs = this.props.regexList.getAll().map(logRegex =>
            <span key={logRegex.id}>
                <RegexInput
                    defaultString={logRegex.exp}
                    onRemoveRegex={() => this.onRemoveRegex(logRegex.id)}
                    onChangeRegexString={(regexString: string) => this.onChangeRegexString(logRegex.id, regexString)} />
                {logFormStore.isRegexValid(logRegex.id) ? <RegexTester regexString={logRegex.exp} /> : inputError}
            </span>
        )

        return (
            <div>
                Regular expressions:{' '}
                {addButton}
                {inputs}
            </div>
        );
    }
}