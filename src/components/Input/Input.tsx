import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import React, { ReactElement, InputHTMLAttributes, ChangeEvent, forwardRef } from 'react';
import Icon from '../Icon/Icon';

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
};

/**
 * input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装
 * 
 * ~~~js
 * // 这样引用
 * import {Input} from "MirageUI";
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  disabled,
  size,
  icon,
  prepend,
  append,
  style,
  value,
  onChange,
  ...restProps
}, ref) => {

  const className = classNames('mirage-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  })

  const fixControlledValue = (value: any) => {
    if(typeof value === 'undefined' || value ===  null) {
      return ''
    }
    return value;
  }

  if (value) {
    delete restProps.defaultValue;
    value = fixControlledValue(value);
  }
  // 如果用户传入了value，那么就不再需要defaultValue这个属性了，需要删掉
  // 同时对value进行verify，如果value是undefined或者是null，就需要人为的将他的值改为空字符串''，否则如果初始值为undefined或者null，然后转化为string会报错


  return (
    <div className={className} style={style}>
      {prepend && <div className='mirage-input-group-prepend'>{prepend}</div>}
      {icon && <div className='icon-wrapper'><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input
        className="mirage-input-inner"
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...restProps}
      />
      {append && <div className="mirage-input-group-append">{append}</div>}
    </div>
  )
})

export default Input;
