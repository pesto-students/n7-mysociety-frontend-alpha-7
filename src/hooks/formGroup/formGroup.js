import { useState } from "react";
import { Validator } from "../../utils";
export default function useFormFields(initialState) {
    const updateFormControl = (value, state, validation = null) => {
        let obj = {
            ...state,
            value
        };
        if (validation) {
            obj = {
                ...obj,
                validation: {
                    ...obj.validation,
                    ...validation
                }
            };
        }
        if (obj?.validation) {
            const validations = Validator.runValidator(value, obj.validation);
            const key = Object.keys(validations).find(
                (key) => validations[key] === false
            );
            if (key) {
                obj.error = true;
                obj.errorMessage = obj.validation?.msgs?.[key] ?? "invalid";
            } else {
                obj.error = false;
                obj.errorMessage = "";
            }
        }

        return obj;
    };

    const getUpdatedInitialState = (state) => {
        let updatedInitialState = { ...state };
        Object.keys(state).forEach((key) => {
            updatedInitialState = {
                ...updatedInitialState,
                [key]: updateFormControl(state[key]?.value, state[key])
            };
        });
        return updatedInitialState;
    };

    const [fields, setValues] = useState(getUpdatedInitialState(initialState));

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
        },
        function (controls) {
            const obj = {};
            controls.forEach((control) => {
                const nameOrId = control.id || control.name;
                obj[nameOrId] = updateFormControl(
                    fields[nameOrId].value,
                    fields[nameOrId],
                    control.validation
                );
            });
            setValues({
                ...fields,
                ...obj
            });
        }
    ];
}
