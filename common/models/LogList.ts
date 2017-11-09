import { observable } from 'mobx';
import { Type } from 'serializer.ts/Decorators';

import { LogId } from '../auxiliary/Types';
import { Log } from './Log';

export class LogList {

    @Type(() => Log)
    @observable private _list: Array<Log>

    constructor(list: Array<Log> = []) {
        this._list = list
    }

    remove(id: LogId) {
        let index = this._list.findIndex(log => log.id == id)
        if (index < 0) {
            throw new Error('Log with id ' + id + ' doesn\'t exist')
        } else {
            let log: Log = this._list[0]
            this._list = this._list.filter(log => log.id != id)
            return log
        }
    }

    add(log: Log) {
        let index = this._list.findIndex(item => item.id == log.id)
        if (index > 0) {
            throw new Error('Log with id ' + log.id + ' already exists')
        } else {
            this._list.unshift(log)
            return log
        }
    }

    update(id: LogId, log: Log) {
        let index = this._list.findIndex(log => log.id == id)
        if (index < 0) {
            throw new Error('Log with id ' + id + ' doesn\'t exist')
        } else {
            this._list[index] = log
        }
    }

    get(id: LogId): Log {
        let index: number = this._list.findIndex(log => log.id === id)
        if (index < 0) {
            throw new Error('Log with id ' + id + ' doesn\'t exist')
        }
        return this._list[index]
    }

    getAll(): Array<Log> {
        return this._list
    }
}