import * as React from 'react';

export interface SaveButtonProps {
    onSave(): void
    disabled: boolean
}

interface SaveButtonState {

}

export default class SaveButton extends React.Component<SaveButtonProps, SaveButtonState> {

    render() {
        return (
            <button
                disabled={this.props.disabled}
                onClick={() => {
                    this.props.onSave()
                }}>
                Save
            </button>
        );
    }
}