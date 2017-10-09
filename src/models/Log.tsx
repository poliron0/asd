import { Skip, Type } from 'serializer.ts/Decorators';
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

interface LogRegexDetails {
    _id: string 
    _exp: string
}
interface LogDetails {
    _name: string
    _location: string
    _isRotating: boolean
    _isSpecialLine: boolean
    _regexList: Array<LogRegexDetails>
}

export class Log {
    @observable protected _name: string
    @observable protected _location: string
    @observable protected _isRotating: boolean
    @observable protected _isSpecialLine: boolean

    //Decorator for serializer - just specify 
    //Array type
    @Type(() => LogRegex)
    @observable protected _regexList: Array<LogRegex>

    constructor(name: string, location: string) {
        this._name = name
        this._location = location
        this._isRotating = false
        this._isSpecialLine = false
        this._regexList = []
    }

    //decorator for skipping getters 
    //In serialization process
    @Skip()
    get name(): string {
        return this._name
    }

    @Skip()
    get location(): string {
        return this._location
    }

    @Skip()
    get isRotating(): boolean {
        return this._isRotating
    }

    @Skip()
    get isSpecialLine(): boolean {
        return this._isSpecialLine
    }

    @Skip()
    get regexList(): Array<LogRegex> {
        return this._regexList
    }

    set name(name: string) {
        this._name = name
    }

    set location(location: string) {
        this._location = location
    }

    set isRotating(isRotating: boolean) {
        this._isRotating = isRotating
    }

    set isSpecialLine(isSpecialLine: boolean) {
        this._isSpecialLine = isSpecialLine
    }

    set regexList(regexList: Array<LogRegex>) {
        this._regexList = regexList
    }

}