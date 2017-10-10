import { isLocationValid } from '../Validators';
import { computed, observable } from 'mobx';

class LogFormStore {
    @observable private _isNameValid = true
    @observable private _isLocationValid = true

    
    constructor() {

    }

    isFormValid(): boolean {
        return this._isLocationValid && this._isNameValid
    }

    @computed get isNameValid() {
        return this._isNameValid
    }

    @computed get isLocationValid() {
        return this._isLocationValid
    }

    set isNameValid(isNameValid: boolean) {
        this._isNameValid = isNameValid
    }

    set isLocationValid(isLocationValid: boolean) {
        this._isLocationValid = isLocationValid
    }
} 

export const logFormStore = new LogFormStore()