import React from 'react';
import { CustomRule } from './useStore';
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
export interface FormItemProps {
    label?: string;
    children?: React.ReactNode;
    name: string;
    valuePropName?: string;
    trigger?: string;
    getValueFromEvent?: (event: any) => any;
    rules?: CustomRule[];
    validateTrigger?: string;
}
declare const FormItem: React.FC<FormItemProps>;
export default FormItem;
