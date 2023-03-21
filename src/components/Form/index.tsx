import {FC} from 'react';
import Form from "./Form";
import FormItem, {FormItemProps} from "./FormItem";

export type IFormComponent = typeof Form & {
  Item: FC<FormItemProps>
}

const TransferredForm: IFormComponent = Form as IFormComponent;
TransferredForm.Item = FormItem;

export default TransferredForm;
