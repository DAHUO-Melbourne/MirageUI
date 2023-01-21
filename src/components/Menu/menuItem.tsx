import classNames from 'classnames';
import React from 'react'

interface MenuItemProps {
  index?: number;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MenuItem = ({
  index,
  className,
  disabled,
  style,
  children,
}: MenuItemProps) => {
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,

  });
  return (
    <li className={classes} style={style}>{children}</li>
  )
}

MenuItem.defaultProps = {
  disabled: false,
}

export default MenuItem;
