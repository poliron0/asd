import { computed, observable } from 'mobx';

import { DataStatus } from '../auxiliary/Enums';
import { LogId } from '../auxiliary/Types';
import { Log } from '../models/Log';
import { LogList } from '../models/LogList';
import { addLog, fetchLog, removeLog, updateLog } from '../services/LogService';

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

    addLog(log: Log) {
        this._dataStatus = DataStatus.UPDATE
        addLog(log)
            .then(result => {
                this._dataStatus = DataStatus.UPDATE_DONE
                this._logList.add(result)
            })
            .catch(err => {
                this._dataStatus = DataStatus.UPDATE_ERROR
            })
    }

    saveLog(id: LogId) {
        //Save the updated log to local storage
        this._dataStatus = DataStatus.UPDATE
        const log: Log = this._logList.get(id)
        updateLog(id, log)
            .then(result => {
                this._dataStatus = DataStatus.UPDATE_DONE
            })
            .catch(err => {
                this._dataStatus = DataStatus.UPDATE_ERROR
            })
    }

    removeLog(id: LogId) {
        this._dataStatus = DataStatus.UPDATE
        removeLog(id)
            .then(result => {
                this._dataStatus = DataStatus.UPDATE_DONE
                //Remove from remote succeded - remove from local copy too
                this._logList.remove(id)
            })
            .catch(err => {
                this._dataStatus = DataStatus.UPDATE_ERROR
            })
    }
}

export const logStore = new LogStore()