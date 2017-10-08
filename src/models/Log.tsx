import { computed, observable } from 'mobx';

export class LogRegex {
    @observable private _exp: string
    @observable private _id: string

    constructor(exp: string) {
        this._exp = exp
        this._id = Math.random().toString()
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
}

interface LogDetails {
    _name: string
    _location: string
    _isRotating: boolean
    _isSpecialLine: boolean
    _regexList: Array<string>
}

export class LogFactory {
    static generateLogFromDetails(logDetails: LogDetails): Log {
        let log: Log = new Log(logDetails._name, logDetails._location)
        log.isRotating = logDetails._isRotating
        log.isSpecialLine = logDetails._isSpecialLine
        log.regexList = logDetails._regexList.map(regexString => new LogRegex(regexString))

        return log
    }
}

export class Log {
    @observable protected _name: string
    @observable protected _location: string
    @observable protected _isRotating: boolean
    @observable protected _isSpecialLine: boolean
    @observable protected _regexList: Array<LogRegex>

    constructor(name: string, location: string) {
        this._name = name
        this._location = location
        this._isRotating = false
        this._isSpecialLine = false
        this._regexList = []
    }

    get name(): string {
        return this._name
    }

    get location(): string {
        return this._location
    }

    get isRotating(): boolean {
        return this._isRotating
    }

    get isSpecialLine(): boolean {
        return this._isSpecialLine
    }

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