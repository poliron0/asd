const validNameRegex: RegExp = /^[A-Za-z][A-Za-z]*$/
const validLogLocationRegex: RegExp = /((?:[a-zA-Z]\:){0,1}(?:[\\/][\w.]+){1,})/
export const isNameValid = (value: string) => validNameRegex.test(value)
export const isLocationValid = (value: string) => validLogLocationRegex.test(value)
// export const isLocationValid = 