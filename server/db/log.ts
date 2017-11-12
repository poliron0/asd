import { serialize } from 'serializer.ts/Serializer';

import { LogId } from '../../common/auxiliary/Types';
import { Log } from '../../common/models/Log';
import { LogList } from '../../common/models/LogList';

let logList: LogList = new LogList([
    new Log('a', '/a'),
    new Log('b', '/b'),
    new Log('c', '/c')
])

export class LogDb {
    public static add = (log: Log) => Promise.resolve(serialize(logList.add(log)))
    public static get = (id: LogId) => Promise.resolve(serialize(logList.get(id)))
    public static getAll = () => Promise.resolve(serialize(logList.getAll()))
    public static remove = (id: LogId) => Promise.resolve(serialize(logList.remove(id)))
    public static update = (log: Log) => Promise.resolve(serialize(logList.update(log.id, log)))
    
}