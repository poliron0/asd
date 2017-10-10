import * as React from 'react';

import { SpecialType } from '../../auxiliary/Enums';

export interface SpecialTypeSelectorProps {
    onSetSpecial(isSpecial: boolean): void
    defaultType: SpecialType
}

interface SpecialTypeSelectorState {
    isSpecial: SpecialType
}

export default class SpecialTypeSelector extends React.Component<SpecialTypeSelectorProps, SpecialTypeSelectorState> {
    constructor() {
        super()
        this.state = {
            isSpecial: SpecialType.NOT_SPECIAL
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            isSpecial: this.props.defaultType
        })
    }
    onSetSpecial(event) {
        let specialType = event.target.value

        switch (specialType) {
            case (SpecialType.SPECIAL):
                this.props.onSetSpecial(true)
                break
            case (SpecialType.NOT_SPECIAL):
                this.props.onSetSpecial(false)
                break
            default:
                this.props.onSetSpecial(true)
        }

        this.setState({
            ...this.state,
            isSpecial: specialType
        })
    }
    render() {
        return (
            <form onChange={this.onSetSpecial.bind(this)}>
                <input type="radio"
                    value={SpecialType.NOT_SPECIAL}
                    name="isSpecialLineLog"
                    checked={this.state.isSpecial == SpecialType.NOT_SPECIAL} /> no

                <input type="radio"
                    value={SpecialType.SPECIAL}
                    name="isSpecialLineLog"
                    checked={this.state.isSpecial == SpecialType.SPECIAL} /> yes
            </form>
        );
    }
}