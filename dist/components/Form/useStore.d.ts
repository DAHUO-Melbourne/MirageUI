/// <reference types="react" />
import { RuleItem, ValidateError } from "async-validator";
export type CustomRuleFunc = ({ getFieldValue }: any) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;
export interface FieldDetailsProps {
    name: string;
    value: string;
    rules: CustomRule[];
    isValid: boolean;
    errors: ValidateError[];
}
export interface FieldsState {
    [key: string]: FieldDetailsProps;
}
export interface FormState {
    isValid: boolean;
    isSubmitting: boolean;
    errors: Record<string, ValidateError[]>;
}
export interface ValidateErrorType extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
}
export interface FieldsActionProps {
    type: 'addField' | 'updateField' | 'updateValidateResult';
    name: string;
    value: any;
}
declare const useStore: (initialValues?: Record<string, any>) => {
    fields: FieldsState;
    dispatch: import("react").Dispatch<FieldsActionProps>;
    form: FormState;
    validateField: (name: string) => Promise<void>;
    getFieldValue: (key: string) => string;
    validateAllField: () => Promise<{
        isValid: boolean;
        errors: Record<string, ValidateError[]>;
        values: {
            [x: string]: string;
        };
    }>;
    getFieldsValue: () => {
        [x: string]: string;
    };
    setFieldValue: (name: string, value: any) => void;
    resetFields: () => void;
};
export default useStore;
