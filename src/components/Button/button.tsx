import React from 'react';
import classNames from 'classnames';
// 使用classNames包来根据参数自动生成classNames，免于手动写if else拼接classNames

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
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

const Button: React.FunctionComponent<ButtonProps> = ({
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
    'disabled': btnType === ButtonType.Link && disabled
  });
  // 使用classNames包来拼接字符串，根据不同参数引入生成对应的classNames。
  // 其中disabled类名专用于link类型的button，因为link类型的button的样式的disabled只能由className来处理因为a tag没有disabled的属性。
  if (btnType === ButtonType.Link && href) {
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
  btnType: ButtonType.Default,
}

export default Button;