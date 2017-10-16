import * as React from 'react';

import RotatingTypeSelector from '../../components/selectors/RotatingTypeSelector';
import SpecialTypeSelector from '../../components/selectors/SpecialTypeSelector';
import { RotatingType, SpecialType } from '../../auxiliary/Enums';
import { logStore } from '../../stores/LogStore';

export interface SelectorsContainerProps {
}

interface SelectorsContainerState {

}

export default class SelectorsContainer extends React.Component<SelectorsContainerProps, SelectorsContainerState> {
    render() {

        const specialTypeSelector = <SpecialTypeSelector
            defaultType={logStore.log.isSpecialLine ? SpecialType.SPECIAL : SpecialType.NOT_SPECIAL}
            onSetSpecial={(isSpecialLine: boolean) => {
                logStore.log.isSpecialLine = isSpecialLine
            }} />

        const rotatingTypeSelector = <RotatingTypeSelector
            defaultType={logStore.log.isRotating ? RotatingType.ROTATING : RotatingType.NOT_ROTATING}
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