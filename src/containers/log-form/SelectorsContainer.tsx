import { observer } from 'mobx-react';
import * as React from 'react';

import RotatingTypeSelector from '../../components/selectors/RotatingTypeSelector';
import SpecialTypeSelector from '../../components/selectors/SpecialTypeSelector';
import { logStore } from '../../stores/LogStore';

export interface SelectorsContainerProps {
    onSetSpecialLine(boolean): void
    onSetRotating(boolean): void
}

interface SelectorsContainerState {

}

@observer
export default class SelectorsContainer extends React.Component<SelectorsContainerProps, SelectorsContainerState> {
    render() {

        const specialTypeSelector = <SpecialTypeSelector
            isSpecial={logStore.log.isSpecialLine}
            onSetSpecial={this.props.onSetSpecialLine} />

        const rotatingTypeSelector = <RotatingTypeSelector
            isRotating={logStore.log.isRotating}
            onSetRotating={this.props.onSetRotating} />

        return (
            <span>
                Does the log contain special line?
                {specialTypeSelector}
                Is the log rotating?
                {rotatingTypeSelector}
            </span>
        );
    }
}