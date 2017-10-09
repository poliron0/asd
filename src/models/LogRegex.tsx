import { computed, observable } from 'mobx';

export class LogRegex {
    @observable private _exp: string
    @observable private _id: string

    constructor(exp: string, id: string = Math.random().toString()) {
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

    setId(id: string) {
        this._id = id
    }
}