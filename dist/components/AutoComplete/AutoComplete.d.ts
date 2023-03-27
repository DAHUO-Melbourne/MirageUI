import React, { ReactElement } from 'react';
import { InputProps } from '../Input/Input';
interface DataSourceObject {
    value: string;
}
export type DataSourseType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (p: string) => DataSourseType[] | Promise<DataSourseType[]>;
    onSelect?: (p: DataSourseType) => void;
    renderOption?: (p: DataSourseType) => ReactElement;
}
export declare const AutoComplete: React.FC<AutoCompleteProps>;
export default AutoComplete;
