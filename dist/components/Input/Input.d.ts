import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { ReactElement, InputHTMLAttributes, ChangeEvent } from 'react';
type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**是否禁用input */
    disabled?: boolean;
    /**设置input的大小，支持lg或者是sm */
    size?: InputSize;
    /**添加图标，右侧悬浮窗添加一个图标，用于提示 */
    icon?: IconProp;
    /**添加前缀，用于配置一些固定组合 */
    prepend?: string | ReactElement;
    /**添加后缀，用于配置一些固定组合 */
    append?: string | ReactElement;
    /**受控组件input的值 */
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装
 *
 * ~~~js
 * // 这样引用
 * import {Input} from "MirageUI";
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export declare const Input: React.FC<InputProps>;
export default Input;
