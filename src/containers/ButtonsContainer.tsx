import { observer } from 'mobx-react';
import * as React from 'react';

import { logFormStore } from '../stores/LogFormStore';
import { logStore } from '../stores/LogStore';
import { viewStore } from '../stores/ViewStore';

export interface ButtonsContainerProps {
}

interface ButtonsContainerState {

}

@observer
export default class ButtonsContainer extends React.Component<ButtonsContainerProps, ButtonsContainerState> {
    render() {
        const isFormValid = logFormStore.isFormValid()
        
        return (
            <div>
                <button
                    onClick={() => logStore.saveLog()}
                    disabled={!isFormValid}>
                    Save
                </button>
                <button
                    onClick={() => {
                        logStore.saveLog()
                        viewStore.isEditMode = false
                    }}
                    disabled={!isFormValid}>
                    Save and close
                </button>
            </div>
        );
    }
}