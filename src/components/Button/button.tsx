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

const Button: React.FunctionComponent<BaseButtonProps> = ({
  className,
  disabled,
  size,
  btnType,
  children,
  href,
}) => {
  const classes = classNames('btn', {
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
    >
      {children}
    </a>
    );
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
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