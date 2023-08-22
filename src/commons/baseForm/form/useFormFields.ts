import { useCallback, useState } from "react";
import { InputTextFieldType } from "../../../components/baseComponentTypes";
import { FormData } from "../../InputTextField/InputTextField";


export interface FormField {
    getValue: () => FormData | null;
    onChange: (data: FormData) => void;
}

export const useFormField = (type: InputTextFieldType, initialInput: FormData | null): FormField => {
    const [values, setValues] = useState<FormData | null>(initialInput);

    const getValue = useCallback((): FormData | null => {
        if (!values) {
            return null;
        }
        return values;
    },
        [values]
    );

    const onChange = (data: FormData) => {
        setValues(data);
    };

    return {
        getValue,
        onChange
    };
}