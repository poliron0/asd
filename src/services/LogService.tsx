import { deserialize, serialize } from 'serializer.ts/Serializer';
import { Log } from '../models/Log';
const defaultLog = new Log('defaultName', 'c:/')

const localStorageKey = 'log'

export const fetchLog = (): Promise<Log> => {

    //Simulate data fetch from server
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let lastSavedLog = JSON.parse(localStorage.getItem(localStorageKey))
            if (!lastSavedLog) {
                resolve(defaultLog)
            } else {

                resolve(deserialize<Log>(Log, lastSavedLog))
            }
        }, 2000)
    })
}

export const updateLog = (log: Log): Promise<Log> => {
    //Simulate server update
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const seralizedLog = JSON.stringify(serialize(log))
            let lastSavedLog = JSON.parse(localStorage.getItem(localStorageKey))
            localStorage.setItem(localStorageKey, seralizedLog)
            resolve(log)
        }, 2000)
    })

}