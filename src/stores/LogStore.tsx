import { DataStatus } from '../auxiliary/Enums';
import { computed, observable } from 'mobx';
import { deserialize, serialize } from 'serializer.ts/Serializer';

import { Log } from '../models/Log';
import { fetchLog } from '../services/LogService';

const localStorageKey = 'log'

class LogStore {
    @observable private _log: Log
    @observable private _dataStatus: DataStatus

    constructor() {
        this._dataStatus = DataStatus.FETCH
        console.log("constructor!")
        fetchLog()
            .then((result: Log) => {
                this._log = result
                this._dataStatus = DataStatus.DONE
            })
            .catch(err => {
                this._dataStatus = DataStatus.ERROR
            })
        //Retrieve last saved log from local storage
        // let lastSavedLog = JSON.parse(localStorage.getItem(localStorageKey))
        // if (!lastSavedLog) {
        //     this._log = defaultLog
        // } else {
        //     this._log = deserialize<Log>(Log, lastSavedLog)
        // }
    }

    @computed get log(): Log {
        return this._log
    }

    @computed get dataStatus(): DataStatus {
        return this._dataStatus
    }

    saveLog() {
        //Save the updated log to local storage
        const seralizedLog = JSON.stringify(serialize(this._log))
        localStorage.setItem(localStorageKey, seralizedLog)
    }
}

export const logStore = new LogStore()