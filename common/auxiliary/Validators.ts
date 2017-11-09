import { Log } from '../models/Log';
import { LogRegex } from '../models/LogRegex';

const validNameRegex: RegExp = /^[A-Za-z][A-Za-z]*$/
const validLogLocationRegex: RegExp = /((?:[a-zA-Z]\:){0,1}(?:[\\/][\w.]+){1,})/

export const isNameValid = (value: string) =>
    typeof value === 'string' &&
    validNameRegex.test(value)

export const isLocationValid = (value: string) =>
    typeof value === 'string' &&
    validLogLocationRegex.test(value)

export const isRegexValid = (regexString: string) => {

    if (typeof regexString != 'string') {
        return false
    }

    let parts = regexString.split('/')
    let regex = regexString
    let options = "";

    if (parts.length > 1) {
        regex = parts[1];
        options = parts[2];
    }

    try {
        new RegExp(regex, options);
        return true;
    }
    catch (error) {
        return false;
    }
}

export const isLogValid = (log: Log): boolean =>
    isNameValid(log.name)
    && isLocationValid(log.location)
    && log.regexList.getAll().every((logRegex: LogRegex) => isRegexValid(logRegex.exp))
    && typeof log.isRotating === 'boolean'
    && typeof log.isSpecialLine === 'boolean'
