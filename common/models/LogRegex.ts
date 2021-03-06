import { computed, observable } from 'mobx';

import { LogRegexId } from '../auxiliary/Types';
import IdGenerator from '../auxiliary/IdGenerator';

export class LogRegex {
    @observable private _exp: string
    @observable private _id: LogRegexId

    constructor(exp: string, id: LogRegexId = IdGenerator.generateId()) {
        this._exp = exp
        this._id = id
    }

    @computed get exp() {
        return this._exp
    }

    @computed get id() {
        return this._id
    }

    setExp(exp: string) {
        this._exp = exp
    }

    setId(id: LogRegexId) {
        this._id = id
    }
}