import { observer } from 'mobx-react';
import * as React from 'react';

import RotatingTypeSelector from '../../components/selectors/RotatingTypeSelector';
import SpecialTypeSelector from '../../components/selectors/SpecialTypeSelector';
import { logStore } from '../../stores/LogStore';

export interface SelectorsContainerProps {
}

interface SelectorsContainerState {

}

@observer
export default class SelectorsContainer extends React.Component<SelectorsContainerProps, SelectorsContainerState> {
    render() {

        const specialTypeSelector = <SpecialTypeSelector
            isSpecial={logStore.log.isSpecialLine}
            onSetSpecial={(isSpecialLine: boolean) => {
                logStore.log.isSpecialLine = isSpecialLine
            }} />

        const rotatingTypeSelector = <RotatingTypeSelector
            isRotating={logStore.log.isRotating}
            onSetRotating={(isRotating: boolean) => {
                logStore.log.isRotating = isRotating
            }} />

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