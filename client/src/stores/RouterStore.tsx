import { action, computed, observable } from 'mobx';

import { Paths } from '../auxiliary/Enums';

class RouterStore {
    @observable private _location: string

    constructor(location = window.location.pathname) {
        this._location = location
    }

    @computed get location(): string {
        return this._location
    }

    @computed get route(): string {
        return '/' + ('' || this._location.split('/')[1])
    }

    @action goTo(pathName: string) {
        window.history.pushState(Math.random(), '', pathName)
        this._location = pathName
    }

}

export const routerStore = new RouterStore()