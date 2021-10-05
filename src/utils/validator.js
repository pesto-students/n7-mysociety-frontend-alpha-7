export class Validator {
    /*eslint-disable */
    static regex = {
        email: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/i,
        numbersOnly: "",
        textOnly: "",
        mobile: /^\d{10}$/i
    };
    /*eslint-enable */

    static required = (value) => {
        if (
            !value ||
            value === "" ||
            value === null ||
            value === undefined ||
            value === 0
        ) {
            return false;
        }
        return true;
    };

    static pattern = (value, pattern) => {
        const regex = new RegExp(pattern);
        return value.match(regex);
    };

    static maxLength = (value, length) => {
        if (value.length > length) {
            return false;
        }
        return true;
    };

    static minLength = (value, length) => {
        if (value.length < length) {
            return false;
        }
        return true;
    };

    static minDate = (value, minDate) => {
        if (new Date(value) < minDate) {
            return false;
        }
        return true;
    };

    static runValidator(value, validations) {
        const obj = {};
        Object.keys(validations)
            .filter((key) => key !== "msgs")
            .forEach((key) => {
                obj[key] = true;
                switch (key) {
                    case "required":
                        if (validations[key] && !Validator.required(value)) {
                            obj[key] = false;
                        }
                        break;
                    case "pattern":
                        if (!Validator.pattern(value, validations[key])) {
                            obj[key] = false;
                        }
                        break;
                    case "minLength":
                        if (!Validator.minLength(value, validations[key])) {
                            obj[key] = false;
                        }
                        break;
                    case "maxLength":
                        if (!Validator.maxLength(value, validations[key])) {
                            obj[key] = false;
                        }
                        break;
                    case "minDate":
                        if (!Validator.minDate(value, validations[key])) {
                            obj[key] = false;
                        }
                        break;
                    default:
                        break;
                }
            });
        return obj;
    }

    static isFormValid(form) {
        const errorObj = Object.keys(form).find((key) => !!form[key].error);
        if (!errorObj) {
            return true;
        }
        return false;
    }
}
