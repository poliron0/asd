import * as React from 'react';
import { TextField, Button, Grid } from 'material-ui';
import { dark } from 'material-ui/styles/createPalette';

export interface RegexInputProps {
    regexString: string
    onChangeRegexString(regexString: string): void
    onRemoveRegex(): void
    isValid: boolean
    errorMessage: string
}

interface RegexInputState {
}

export default class RegexInput extends React.Component<RegexInputProps, RegexInputState> {

    onRemoveRegex() {
        this.props.onRemoveRegex()
    }

    onChangeRegexString(event) {
        this.props.onChangeRegexString(event.target.value)
    }

    constructor() {
        super()
    }

    render() {
        return (
            <Grid container justify='center' direction='row' alignItems='baseline'>
                <Grid item>
                    <TextField
                        margin='normal'
                        error={!this.props.isValid}
                        helperText={this.props.isValid ? '' : this.props.errorMessage}
                        onChange={this.onChangeRegexString.bind(this)}
                        value={this.props.regexString} />
                </Grid>
                <Grid item>
                    <Button 
                        raised
                        color='accent'
                        onClick={this.onRemoveRegex.bind(this)}>
                            Remove 
                    </Button>
                </Grid>
            </Grid>
        );
    }
}