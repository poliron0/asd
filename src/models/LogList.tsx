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
        this._list = this._list.filter(log => log.id != id)
    }

    add(log: Log) {
        this._list.unshift(log)
    }

    // update(id: LogId, log: Log) { 
    //     let index = this._list.findIndex( log => log.id == id)
    //     if(index < 0) {
    //         throw new Error('Log with id ' + id + ' doesn\'t exist')
    //     } else {
    //         this._list[index] = log
    //     }
    // }
    
    getAll(): Array<Log>{
        return this._list
    }
}