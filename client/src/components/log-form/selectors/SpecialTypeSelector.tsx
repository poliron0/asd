import Switch from 'material-ui/Switch';
import * as React from 'react';
import { FormControlLabel } from 'material-ui';

export interface SpecialTypeSelectorProps {
    onSetSpecial(isSpecial: boolean): void
    isSpecial: boolean
}

interface SpecialTypeSelectorState {
    isSpecial: boolean
}

export default class SpecialTypeSelector extends React.Component<SpecialTypeSelectorProps, SpecialTypeSelectorState> {
    constructor() {
        super()
    }

    render() {
        return (
            <FormControlLabel
                control={<Switch
                    checked={this.props.isSpecial}
                    onChange={(event) => this.props.onSetSpecial(!this.props.isSpecial)}
                />}
                label="Does the log contain special line?"
            />

        );
    }
}