import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { ReactElement, InputHTMLAttributes } from 'react';

type InputSize = 'lg' | 'sm';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  // 因为InputHTMLAttributes原生自带size属性，但是是一个number，所以我们定义的属性和原生自带属性重叠且类型不同
  // 这种情况下需要使用Omit来覆盖自带的属性：Omit的参数是两个，第一个是传入的原生类型type，后面是需要被覆盖的属性
  icon?: IconProp;
  prepand?: string | ReactElement;
  appand?: string | ReactElement;
};

export const Input: React.FC<InputProps> = ({
  disabled,
  size,
  icon,
  prepand,
  appand,
}: InputProps) => {
  return (
    <div>Input</div>
  )
}

export default Input;
