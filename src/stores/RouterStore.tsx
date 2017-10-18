import { Paths } from '../auxiliary/Enums';
import { action, computed, observable } from 'mobx';
import createHistory from 'history/createBrowserHistory';
import {History} from 'history'

class RouterStore {
    @observable private _location: string
    
    constructor(location = window.location.pathname) {
        this._location =location
    }
    
    @computed get location(): string {
        return this._location
    }

    @action goTo(pathName: Paths) {
        window.history.pushState(Math.random(),'',pathName)
        this._location = pathName
    }

} 

export const routerStore = new RouterStore()