import * as React from 'react';

export interface SpecialTypeSelectorProps {
    onSetSpecial(isSpecial: boolean): void
}

interface SpecialTypeSelectorState {
    isSpecial: SpecialType
}

enum SpecialType {
    NOT_SPECIAL = "0",
    SPECIAL = "1"
}
export default class SpecialTypeSelector extends React.Component<SpecialTypeSelectorProps, SpecialTypeSelectorState> {
    constructor() {
        super()
        this.state = {
            isSpecial: SpecialType.NOT_SPECIAL
        }
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