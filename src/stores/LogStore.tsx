import { LogList } from '../models/LogList';
import { DataStatus } from '../auxiliary/Enums';
import { computed, observable } from 'mobx';
import { deserialize, serialize } from 'serializer.ts/Serializer';

import { Log } from '../models/Log';
import { fetchLog, updateLog } from '../services/LogService';
import { LogId } from '../auxiliary/Types';

const localStorageKey = 'log'

class LogStore {
    @observable private _logList: LogList
    @observable private _dataStatus: DataStatus

    constructor() {
        this._dataStatus = DataStatus.FETCH
        fetchLog()
            .then((result: LogList) => {
                this._logList = result
                this._dataStatus = DataStatus.FETCH_DONE
            })
            .catch(err => {
                this._dataStatus = DataStatus.FETCH_ERROR
            })
        //Retrieve last saved log from local storage
        // let lastSavedLog = JSON.parse(localStorage.getItem(localStorageKey))
        // if (!lastSavedLog) {
        //     this._logList = defaultLog
        // } else {
        //     this._logList = deserialize<Log>(Log, lastSavedLog)
        // }
    }

    @computed get logList(): LogList {
        return this._logList
    }

    @computed get dataStatus(): DataStatus {
        return this._dataStatus
    }

    saveLog(id: LogId) {
        //Save the updated log to local storage
        this._dataStatus = DataStatus.UPDATE
        const log: Log = this._logList.getAll().filter(log => log.id === id)[0]
        updateLog(id, log)
            .then(result => {
                this._dataStatus = DataStatus.UPDATE_DONE
            })
            .catch(err => {
                this._dataStatus = DataStatus.UPDATE_ERROR
            })
    }
}

export const logStore = new LogStore()