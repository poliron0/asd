import * as React from 'react';

export interface SpecialTypeSelectorProps {
    onSetSpecial(isSpecial: boolean): void
    isSpecial: boolean
}

interface SpecialTypeSelectorState {
    isSpecial: boolean
}

export default class SpecialTypeSelector extends React.Component<SpecialTypeSelectorProps, SpecialTypeSelectorState> {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <input type="radio"
                    name="isSpecialLineLog"
                    checked={!this.props.isSpecial} 
                    onChange={() => this.props.onSetSpecial(false)}/> no

                <input type="radio"
                    name="isSpecialLineLog"
                    checked={this.props.isSpecial} 
                    onChange={() => this.props.onSetSpecial(true)}/> yes
            </div>
        );
    }
}