export const updateObject = (oldObj, updatedProps) => {
    return {
        ...oldObj,
        ...updatedProps
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    if(rules.isEmail) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi
        isValid = pattern.test(value) && isValid;
    }
    if(rules.isName) {
        const pattern = /[A-Z|a-z]+/gi
        isValid = pattern.test(value) && isValid;
    }
    return isValid;
}