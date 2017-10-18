import { observer } from 'mobx-react';
import * as React from 'react';

import { Paths } from '../../auxiliary/Enums';
import { logStore } from '../../stores/LogStore';
import { routerStore } from '../../stores/RouterStore';
import { isLogValid } from '../../auxiliary/Validators';

export interface ButtonsContainerProps {
}

interface ButtonsContainerState {

}

@observer
export default class ButtonsContainer extends React.Component<ButtonsContainerProps, ButtonsContainerState> {
    render() {
        const isFormValid = isLogValid(logStore.log)
        
        return (
            <div>
                <button
                    onClick={() => {logStore.saveLog()}}
                    disabled={!isFormValid}>
                    Save
                </button>
                <button
                    onClick={() => {
                        logStore.saveLog()
                        routerStore.goTo(Paths.VIEW)
                    }}
                    disabled={!isFormValid}
                    >
                    Save and close
                </button>
            </div>
        );
    }
}