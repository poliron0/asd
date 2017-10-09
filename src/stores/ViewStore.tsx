import { computed, observable } from 'mobx';

class ViewStore {
    @observable private _isEditMode: boolean

    constructor(isEditMode: boolean = false) {
        //Retrieve last saved log from local storage
        this._isEditMode = isEditMode
    }

    @computed get isEditMode(): boolean {
        return this._isEditMode
    }

    set isEditMode(isEditMode: boolean) {
        this._isEditMode = isEditMode
    }

}

export const viewStore = new ViewStore()