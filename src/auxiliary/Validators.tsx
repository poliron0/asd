const validNameRegex: RegExp = /^[A-Za-z][A-Za-z]*$/
const validLogLocationRegex: RegExp = /((?:[a-zA-Z]\:){0,1}(?:[\\/][\w.]+){1,})/

export const isNameValid = (value: string) => validNameRegex.test(value)
export const isLocationValid = (value: string) => validLogLocationRegex.test(value)
export const isRegexValid = (regexString: string) =>  {

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
    catch(error) {
        return false;
    }
}