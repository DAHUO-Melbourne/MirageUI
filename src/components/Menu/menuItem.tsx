import classNames from 'classnames';
import React, {useContext} from 'react'
import {MenuContext} from './menu';

interface MenuItemProps {
  index: number;
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
  const context = useContext(MenuContext);

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  });

  const handleClick = () => {
    context.onSelect && !disabled && context.onSelect(index);
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>{children}</li>
  )
}

MenuItem.defaultProps = {
  disabled: false,
}

export default MenuItem;
