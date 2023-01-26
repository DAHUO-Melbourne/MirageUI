import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps,
  className?: string,
}

const Icon: React.FC<IconProps> = ({
  theme,
  className,
  ...rest
}: IconProps) => {
  const classes = classNames('mirage-icon', className, {
    [`icon-${theme}`]: theme
  });

  return (
    <FontAwesomeIcon className={classes} {...rest} />
  )
}

export default Icon;
