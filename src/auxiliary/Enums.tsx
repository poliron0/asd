export enum ShowFilter {
    Model,
    Relation,
    All
}

export enum Paths {
    MAIN = '/',
    VIEW = '/view',
    EDIT = '/edit'
}

export enum DataStatus {
    FETCH,
    FETCH_ERROR,
    FETCH_DONE,
    UPDATE,
    UPDATE_ERROR,
    UPDATE_DONE
}