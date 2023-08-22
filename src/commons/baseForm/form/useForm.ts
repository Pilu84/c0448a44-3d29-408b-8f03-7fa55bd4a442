import { FormField } from "./useFormFields";

export interface FormStateInterface {
    [key: string]: FormField
}


export const useForm = (field: FormStateInterface) => {

       return {
        field
    };
};
