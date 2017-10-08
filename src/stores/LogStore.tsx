import { computed, observable } from 'mobx';

import { Log, LogFactory } from '../models/Log';

const defaultLog = new Log('default', 'c:/')
const localStorageKey = 'log'

class LogStore {
    @observable private _log: Log

    constructor() {
        //Retrieve last saved log from local storage
        let lastSavedLog = JSON.parse(JSON.parse(localStorage.getItem(localStorageKey)))
        console.log(lastSavedLog)
        if(!lastSavedLog) {
            this._log = defaultLog
        } else {
            this._log = LogFactory.generateLogFromDetails(lastSavedLog)
        }
    }

    @computed get log(): Log {
        return this._log
    }

    setLog(log: Log) {
        this._log = log
        //Save the updated log to local storage
        localStorage.setItem(localStorageKey, JSON.stringify(log))
    }

    saveLog() {
        //Save the updated log to local storage
        localStorage.setItem(localStorageKey, JSON.stringify(JSON.stringify(this._log)))
        console.log(localStorage.getItem(localStorageKey))
    }
}

export const logStore = new LogStore()