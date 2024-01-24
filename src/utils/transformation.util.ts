export const strToBool = (str: string): boolean => {
    return (/true|1|On/i).test(str)
}