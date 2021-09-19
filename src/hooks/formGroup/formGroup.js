import { useState } from "react";
import { Validator } from "../../utils";
export default function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState);

    const updateFormControl = (value, state) => {
        const obj = {
            ...state,
            value
        };
        if (state?.validation) {
            const validations = Validator.runValidator(value, state.validation);
            const key = Object.keys(validations).find(
                (key) => validations[key] === false
            );
            if (key) {
                obj.error = true;
                obj.errorMessage = state.validation?.msgs[key] ?? "invalid";
            } else {
                obj.error = false;
                obj.errorMessage = "";
            }
        }

        return obj;
    };

    return [
        fields,
        function (event) {
            const nameOrId = event.target.id || event.target.name;
            setValues({
                ...fields,
                [nameOrId]: updateFormControl(
                    event.target.value,
                    fields[nameOrId]
                )
            });
        }
    ];
}
