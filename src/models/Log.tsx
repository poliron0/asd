import { Skip, Type } from 'serializer.ts/Decorators';
import { computed, observable } from 'mobx';
import { LogRegex } from './LogRegex';

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