import { observable } from 'mobx';
import { Type } from 'serializer.ts/Decorators';

import { LogRegex } from './LogRegex';
import { LogRegexId } from '../auxiliary/Types';

export class RegexList {

    @Type(() => LogRegex)
    @observable private _list: Array<LogRegex>

    constructor() {
        this._list = []
    }

    remove(id: LogRegexId) {
        this._list = this._list.filter(logRegex => logRegex.id != id)
    }

    add(logRegex: LogRegex) {
        this._list.unshift(logRegex)
    }

    getAll(): Array<LogRegex>{
        return this._list
    }
}