import { observer } from 'mobx-react';
import * as React from 'react';

import { LogRegexId } from '../../../auxiliary/Types';
import { isRegexValid } from '../../../auxiliary/Validators';
import InputError from '../inputs/InputError';
import RegexInput from '../inputs/RegexInput';
import RegexTester from '../inputs/RegexTester';
import { LogRegex } from '../../../models/LogRegex';
import { RegexList } from '../../../models/RegexList';

export interface RegexListContainerProps {
    regexList: RegexList
}

interface RegexListContainerState {

}

@observer
export default class RegexListContainer extends React.Component<RegexListContainerProps, RegexListContainerState> {

    onChangeRegexString(id: LogRegexId, regexString: string) {
        this.props.regexList.getAll().map(regex => {
            if (regex.id === id) {
                regex.setExp(regexString)
            }

            return regex
        })
    }

    onRemoveRegex(id: LogRegexId) {
        this.props.regexList.remove(id)
    }

    onAddRegex(regex: LogRegex) {
        this.props.regexList.add(regex)
    }

    render() {

        const addButton =
            <button onClick={(event) => this.onAddRegex(new LogRegex(''))}>
                Add regular expression
            </button>

        const inputError = <InputError errorMessage={'Please enter a valid javascript regex!'} />

        const inputs = this.props.regexList.getAll().map(logRegex =>
            <div key={logRegex.id}>
                <RegexInput
                    regexString={logRegex.exp}
                    onRemoveRegex={() => this.onRemoveRegex(logRegex.id)}
                    onChangeRegexString={(regexString: string) => this.onChangeRegexString(logRegex.id, regexString)} />
                {isRegexValid(logRegex.exp) ? <RegexTester regexString={logRegex.exp} /> : inputError}
            </div>
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