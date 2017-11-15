import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItem from 'material-ui/List/ListItem';
import List from 'material-ui/List';
import { observer } from 'mobx-react';
import * as React from 'react';

import { LogRegexId } from '../../../../../common/auxiliary/Types';
import { isRegexValid } from '../../../../../common/auxiliary/Validators';
import InputError from '../inputs/InputError';
import RegexInput from '../inputs/RegexInput';
import RegexTester from '../inputs/RegexTester';
import { LogRegex } from '../../../../../common/models/LogRegex';
import { RegexList } from '../../../../../common/models/RegexList';
import TextFormat from 'material-ui-icons/TextFormat';
import { FormControl, FormGroup, FormLabel, Card, CardContent, Button, CardActions } from 'material-ui';

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
            <Button
                raised
                color='primary'
                onClick={(event) => {
                    this.onAddRegex(new LogRegex(''))
                }}>
                 Add expression
            </Button>


        const inputs = <FormGroup>
            <FormLabel>
                Regular Expressions
            </FormLabel>
            {this.props.regexList.getAll().map(logRegex =>
                <FormControl >
                    <RegexInput
                        key={logRegex.id}
                        isValid={isRegexValid(logRegex.exp)}
                        errorMessage={'Please enter a valid javascript regex!'}
                        regexString={logRegex.exp}
                        onRemoveRegex={() => this.onRemoveRegex(logRegex.id)}
                        onChangeRegexString={(regexString: string) => this.onChangeRegexString(logRegex.id, regexString)} />
                        {isRegexValid(logRegex.exp) ? <RegexTester regexString={logRegex.exp} /> : ''}
                </FormControl>
            )}
        </FormGroup>

        return (
            <Card>
                <CardContent>
                    {inputs}
                </CardContent>
                <CardActions>
                    {addButton}
                </CardActions>
            </Card>
        );
    }
}