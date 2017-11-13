import { toJS } from 'mobx';
import { serialize } from 'serializer.ts/Serializer';

import { LogId } from '../../common/auxiliary/Types';
import { Log } from '../../common/models/Log';
import { LogList } from '../../common/models/LogList';
import { MongoClient } from 'mongodb';

let logList: LogList = new LogList([
    new Log('a', '/a'),
    new Log('b', '/b'),
    new Log('c', '/c')
])

export class LogDb {
    // public static add = (log: Log) => Promise.resolve(serialize(logList.add(log)))
    // public static get = (id: LogId) => Promise.resolve(serialize(logList.get(id)))
    // public static getAll = () => Promise.resolve(serialize(logList.getAll()))
    // public static remove = (id: LogId) => Promise.resolve(serialize(logList.remove(id)))
    // public static update = (log: Log) => Promise.resolve(serialize(logList.update(log.id, log)))
    
    public static add = async (log: Log) => {
        let url = 'mongodb://localhost:27017/hafifa'
        let db = await MongoClient.connect(url)

        let logscollection = await db.collection('logs')
        let result = (await logscollection.insert(toJS(log))).ops[0]
        db.close()

        return result
    }

    public static get = async (id: LogId) => {
        let url = 'mongodb://localhost:27017/hafifa'
        let db = await MongoClient.connect(url)
        let logscollection = await db.collection('logs')
        let result = await logscollection.findOne({'_id': id})
        db.close()

        return result
    }

    public static getAll = async () => {
        let url = 'mongodb://localhost:27017/hafifa'
        let db = await MongoClient.connect(url)
        let logscollection = await db.collection('logs')
        let result = await logscollection.find({}).toArray()
        db.close()

        return result
    }
    public static remove = async (id: LogId) => {
        let url = 'mongodb://localhost:27017/hafifa'
        let db = await MongoClient.connect(url)
        let logscollection = await db.collection('logs')
        let result = (await logscollection.findOneAndDelete({'_id': id})).value
        db.close()
        
        if(!result) {
            throw new Error('Log with id ' + id + ' doesn\'t exist')
        }
        return result
    }
    public static update = async (log: Log) => {
        let url = 'mongodb://localhost:27017/hafifa'
        let db = await MongoClient.connect(url)
        let logscollection = await db.collection('logs')
        let result = (await logscollection.findOneAndUpdate({'_id': log.id}, toJS(log), {
            returnOriginal: false
        })).value
        db.close()
        
        console.log(result)
        if(!result) {
            throw new Error('Log with id ' + log.id + ' doesn\'t exist')
        }

        return result
    }
}