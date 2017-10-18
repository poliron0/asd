export enum ShowFilter {
    Model,
    Relation,
    All
}

export enum AddFormType {
    Model,
    Relation
}

export enum SpecialType {
    NOT_SPECIAL = "0",
    SPECIAL = "1"
}

export enum RotatingType {
    NOT_ROTATING = "0",
    ROTATING = "1"
}

export enum Paths {
    MAIN = '/',
    VIEW = '/view',
    EDIT = '/edit'
}

export enum DataStatus {
    FETCH,
    UPDATE,
    DONE,
    ERROR
}