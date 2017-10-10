import { logStore } from './LogStore';
import { isLocationValid, isRegexValid } from '../auxiliary/Validators';
import { computed, observable } from 'mobx';
import { RegexList } from '../models/RegexList';

class LogFormStore {
    @observable private _isNameValid: boolean = true
    @observable private _isLocationValid: boolean = true
    @observable private _isRegexValid: Map<string, boolean> = new Map<string, boolean>()
    
    constructor() {
        logStore.log.regexList.getAll().forEach(logRegex => {
            this._isRegexValid.set(logRegex.id, true)
        })
    }

    isRegexValid(id: string): boolean {
        return this._isRegexValid.get(id)
    }

    setRegexValid(id: string, isValid: boolean) {
        this._isRegexValid.set(id, isValid)
        console.log(JSON.stringify(this._isRegexValid))
    }

    setAllValid() {
        for(let key of this._isRegexValid.keys()) {
            this._isRegexValid.set(key, true)
        }
    }

    removeRegex(id: string) {
        this._isRegexValid.delete(id)
    }

    isFormValid(): boolean {
        for(let isRegexValid of this._isRegexValid.values()) {
            if(!isRegexValid) {
                return false
            }
        }

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