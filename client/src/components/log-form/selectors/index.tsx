import { observer } from 'mobx-react';
import * as React from 'react';

import RotatingTypeSelector from './RotatingTypeSelector';
import SpecialTypeSelector from './SpecialTypeSelector';
import { Log } from '../../../../../common/models/Log';
import {FormGroup} from 'material-ui';

export interface SelectorsContainerProps {
    log: Log
    onSetSpecialLine(boolean): void
    onSetRotating(boolean): void
}

interface SelectorsContainerState {

}

@observer
export default class SelectorsContainer extends React.Component<SelectorsContainerProps, SelectorsContainerState> {
    render() {
        const log = this.props.log
        const specialTypeSelector = <SpecialTypeSelector
            isSpecial={log.isSpecialLine}
            onSetSpecial={this.props.onSetSpecialLine} />

    
        const rotatingTypeSelector = <RotatingTypeSelector
            isRotating={log.isRotating}
            onSetRotating={this.props.onSetRotating} />

        return (
            <FormGroup>
                {specialTypeSelector}
                {rotatingTypeSelector}
            </FormGroup>
        );
    }
}