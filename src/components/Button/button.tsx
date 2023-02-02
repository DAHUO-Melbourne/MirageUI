import React from 'react';
import classNames from 'classnames';
// 使用classNames包来根据参数自动生成classNames，免于手动写if else拼接classNames

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
// 拿到全部的button属性，使用联合类型&将BaseButtonProps和原生属性联合到一起形成完整的属性

type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
// 因为我们的组件里包含了button的属性，也包含了anchor的属性。所以当我们要做一个button的时候，很多anchor的属性我们就没法传入。这个时候就会报错。
// 解决的办法是： 给所有的属性设置成可选属性，也就是partial

/**
 * Button element used to be pressed
 * ### import method
 * ```js
 * import {Button} from 'MirageUI'
 * ```
 * 这种是JSDoc格式的注释。添加注释以后可以自动给storybook添加文档
 */
export const Button: React.FunctionComponent<ButtonProps> = ({
  // 需要将Button本身也导出(这一步是为了storybook，只有这样storybook才能自动获取到我们写的button的各自参数以及取值，从而自动在storybook页面上生成参数列表)
  className,
  disabled,
  size,
  btnType,
  children,
  href,
  ...rest
}) => {
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': btnType === 'link' && disabled
  });
  // 使用classNames包来拼接字符串，根据不同参数引入生成对应的classNames。
  // 其中disabled类名专用于link类型的button，因为link类型的button的样式的disabled只能由className来处理因为a tag没有disabled的属性。
  if (btnType === 'link' && href) {
    return (
    <a
      href={href}
      className={classes}
      {...rest}
    >
      {children}
    </a>
    );
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}

export default Button;