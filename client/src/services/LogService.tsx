import { deserialize, serialize } from 'serializer.ts/Serializer';
import { Log } from '../models/Log';
import { LogList } from '../models/LogList';
import { LogId } from '../auxiliary/Types';
const defaultLog = new Log('defaultName', 'c:/')

const localStorageKey = 'log'

export const fetchLog = (): Promise<LogList> => {

    //Simulate data fetch from server
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let lastSavedLogList = JSON.parse(localStorage.getItem(localStorageKey))
            if (!lastSavedLogList) {
                resolve(new LogList([defaultLog]))
            } else {

                resolve(deserialize<LogList>(LogList, lastSavedLogList))
            }
        }, 2000)
    })
}

export const updateLog = (id: LogId, log: Log): Promise<Log> => {
    //Simulate server update

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetchLog()
                .then(result => {
                    result.remove(id)
                    result.add(log)
                    const seralizedLogList = JSON.stringify(serialize(result))
                    localStorage.setItem(localStorageKey, seralizedLogList)
                    resolve(log)
                })
        }, 2000)
    })
}

export const removeLog = (id: LogId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetchLog()
                .then(result => {
                    let log = result.get(id)
                    result.remove(id)
                    const seralizedLogList = JSON.stringify(serialize(result))
                    localStorage.setItem(localStorageKey, seralizedLogList)
                    //Return the removed log
                    resolve(log)
                })
        }, 2000)
    })
}