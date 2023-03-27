import React from 'react';
export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    /** set disable to the button press */
    disabled?: boolean;
    /** set up the size of the button */
    size?: ButtonSize;
    /** set up the type of the button(color etc) */
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * Button element used to be pressed
 * ### import method
 * ```js
 * import {Button} from 'MirageUI'
 * ```
 * 这种是JSDoc格式的注释。添加注释以后可以自动给storybook添加文档
 */
export declare const Button: React.FunctionComponent<ButtonProps>;
export default Button;
