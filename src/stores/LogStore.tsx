import { computed, observable } from 'mobx';
import { deserialize, serialize } from 'serializer.ts/Serializer';

import { Log } from '../models/Log';

const defaultLog = new Log('defaultName', 'c:/')
const localStorageKey = 'log'

class LogStore {
    @observable private _log: Log

    constructor() {
        //Retrieve last saved log from local storage
        let lastSavedLog = JSON.parse(localStorage.getItem(localStorageKey))
        if(!lastSavedLog) {
            this._log = defaultLog
        } else {
            this._log = deserialize<Log>(Log, lastSavedLog)
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
        const seralizedLog = JSON.stringify(serialize(this._log))
        localStorage.setItem(localStorageKey, seralizedLog)

    }
}

export const logStore = new LogStore()