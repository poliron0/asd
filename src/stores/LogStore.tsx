import { DataStatus } from '../auxiliary/Enums';
import { computed, observable } from 'mobx';
import { deserialize, serialize } from 'serializer.ts/Serializer';

import { Log } from '../models/Log';
import { fetchLog, updateLog } from '../services/LogService';

const localStorageKey = 'log'

class LogStore {
    @observable private _log: Log
    @observable private _dataStatus: DataStatus

    constructor() {
        this._dataStatus = DataStatus.FETCH
        fetchLog()
            .then((result: Log) => {
                this._log = result
                this._dataStatus = DataStatus.FETCH_DONE
            })
            .catch(err => {
                this._dataStatus = DataStatus.FETCH_ERROR
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
        this._dataStatus = DataStatus.UPDATE
        updateLog(this._log)
            .then(result => {
                this._dataStatus = DataStatus.UPDATE_DONE
            })
            .catch(err => {
                this._dataStatus = DataStatus.UPDATE_ERROR
            })
    }
}

export const logStore = new LogStore()