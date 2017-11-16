import { computed, observable } from 'mobx';

import { LogId } from '../../../common/auxiliary/Types';
import { Log } from '../../../common/models/Log';
import { LogList } from '../../../common/models/LogList';
import { addLog, fetchAll, fetchLog, removeLog, updateLog } from '../services/LogService';


class LogStore {
    @observable private _logList: LogList

    constructor(logList: LogList = new LogList()) {
        this._logList = logList
    }

    @computed get logList(): LogList {
        return this._logList
    }


    addLog(log: Log): Promise<Log> {
        return addLog(log).then(result => {
            this._logList.add(result)
            return result
        })
        
    }

    fetchAll(): Promise<LogList> {
        return fetchAll().then(result => {
            this._logList = result
            return result
        })
    }

    fetchLog(id: LogId): Promise<Log> {
        return fetchLog(id).then(result => {
            this._logList.set(id, result)
            return result
        })
    }

    updateLog(log: Log): Promise<Log> {
        //Save the updated log to local storage
        // const log: Log = this._logList.get(id)
        return updateLog(log).then( (result) => {
            this._logList.update(log.id, log)
            return result
        })
    }

    removeLog(id: LogId): Promise<Log> {
        return removeLog(id)
            .then(result => {
                //Remove from remote succeded - remove from local copy too
                this._logList.remove(id)
                return result
            })
    }
}

export const logStore = new LogStore()