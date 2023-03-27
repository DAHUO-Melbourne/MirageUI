import { FC } from 'react';
import Form from "./Form";
import { FormItemProps } from "./FormItem";
export type IFormComponent = typeof Form & {
    Item: FC<FormItemProps>;
};
declare const TransferredForm: IFormComponent;
export default TransferredForm;
