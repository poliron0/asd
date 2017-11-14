import * as React from 'react';
import { Button } from 'material-ui';

export interface SaveButtonProps {
    onSave(): void
    disabled: boolean
}

interface SaveButtonState {

}

export default class SaveButton extends React.Component<SaveButtonProps, SaveButtonState> {

    render() {
        return (
            <Button raised color='primary'
                disabled={this.props.disabled}
                onClick={() => {
                    this.props.onSave()
                }}>
                Save
            </Button>
        );
    }
}