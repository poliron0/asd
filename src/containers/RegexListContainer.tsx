import { observer } from 'mobx-react';
import * as React from 'react';

import RegexInput from '../components/inputs/RegexInput';
import { LogRegex } from '../models/LogRegex';
import { RegexList } from '../models/RegexList';
import InputError from '../components/inputs/InputError';
import { logFormStore } from '../stores/LogFormStore';
import { isRegexValid } from '../auxiliary/Validators';

export interface RegexListContainerProps {
    regexList: RegexList
}

interface RegexListContainerState {

}

@observer
export default class RegexListContainer extends React.Component<RegexListContainerProps, RegexListContainerState> {
    
    onChangeRegexString(id: string, regexString: string) {
        logFormStore.setRegexValid(id, isRegexValid(regexString))
        this.props.regexList.getAll().map(regex => {
            if (regex.id === id) {
                regex.setExp(regexString)
            }

            return regex
        })
    }

    onRemoveRegex(id: string) {
        logFormStore.removeRegex(id)
        this.props.regexList.remove(id)
    }

    onAddRegex(regex: LogRegex) {
        logFormStore.setRegexValid(regex.id, true)
        this.props.regexList.add(regex)
    }

    // componentWillUnmount() {
    //     //When component is destroyed we 
    //     //Should set all regex fields to valid, since one can't save 
    //     //invalid regex anyway. That way the user won't see irrelevent
    //     //Error message next to the regex fieldsafter refreshing the page
    //     logFormStore.setAllValid()
    // }
    render() {

        const addButton =
            <button onClick={(event) => this.onAddRegex(new LogRegex(''))}>
                Add regular expression
            </button>

        const inputs = this.props.regexList.getAll().map(logRegex =>
            <span key={logRegex.id}>
                <RegexInput 
                    defaultString={logRegex.exp}
                    onRemoveRegex={() => this.onRemoveRegex(logRegex.id)}
                    onChangeRegexString={(regexString: string) => this.onChangeRegexString(logRegex.id, regexString)} />
                {logFormStore.isRegexValid(logRegex.id) ? '' : <InputError errorMessage={'Please enter a valid javascript regex!'} />}
            </span>
        )

        return (
            <div>
                Regular expressions:
                {addButton}
                {inputs}
            </div>
        );
    }
}