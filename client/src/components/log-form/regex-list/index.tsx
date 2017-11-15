import { Button, Card, CardActions, CardContent, FormControl, FormGroup, FormLabel, Grid } from 'material-ui';
import { observer } from 'mobx-react';
import * as React from 'react';

import { LogRegexId } from '../../../../../common/auxiliary/Types';
import { isRegexValid } from '../../../../../common/auxiliary/Validators';
import { LogRegex } from '../../../../../common/models/LogRegex';
import { RegexList } from '../../../../../common/models/RegexList';
import RegexInput from '../inputs/RegexInput';
import RegexTester from '../inputs/RegexTester';

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


        const inputs = <FormGroup >
            <FormLabel>
                Regular Expressions
            </FormLabel>
            {this.props.regexList.getAll().map(logRegex =>
                <Grid key={logRegex.id} container direction='column' justify='flex-start' alignItems='flex-start'>
                    <Grid item>
                        <RegexInput
                            
                            isValid={isRegexValid(logRegex.exp)}
                            errorMessage={'Please enter a valid javascript regex!'}
                            regexString={logRegex.exp}
                            onRemoveRegex={() => this.onRemoveRegex(logRegex.id)}
                            onChangeRegexString={(regexString: string) => this.onChangeRegexString(logRegex.id, regexString)} />
                    </Grid>
                    <Grid item>
                        {isRegexValid(logRegex.exp) ? <RegexTester regexString={logRegex.exp} /> : ''}
                    </Grid>
                </Grid>
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