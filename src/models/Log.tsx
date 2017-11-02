import { Skip, Type } from 'serializer.ts/Decorators';
import { computed, observable } from 'mobx';
import { LogRegex } from './LogRegex';
import { RegexList } from './RegexList';
import { LogId } from '../auxiliary/Types';
import IdGenerator from '../auxiliary/IdGenerator';

export class Log {
    @observable protected _id: LogId
    @observable protected _name: string
    @observable protected _location: string
    @observable protected _isRotating: boolean
    @observable protected _isSpecialLine: boolean

    //Decorator for serializer - just specify 
    //Array type
    @Type(() => RegexList)
    @observable protected _regexList: RegexList

    constructor(name: string, location: string, id: LogId = IdGenerator.generateId()) {
        this._id = id
        this._name = name
        this._location = location
        this._isRotating = false
        this._isSpecialLine = false
        this._regexList = new RegexList()
    }

    //Decorator for skipping getters 
    //In serialization process
    @Skip()
    get name(): string {
        return this._name
    }

    @Skip() 
    get id(): LogId{
        return this._id
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
    get regexList(): RegexList {
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

    set regexList(regexList: RegexList) {
        this._regexList = regexList
    }

}