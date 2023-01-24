import React, {useContext, useState, FunctionComponentElement} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import {MenuItemProps} from './menuItem';

export interface SubMenuProps { 
  index?: number;
  title: string;
  className?: string;
  children: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  className,
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const context = useContext(MenuContext);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  let timer: any;

  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300);
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
  } : {};
  // 返回一个object用以传入不同的属性：事件处理函数

  const subMenuClasses = classNames('mirage-submenu', {
    'menu-opened': menuOpen
  })

  const renderChildren = () => {
    const childrenComponent =  React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      // 进行类选断言以拿到type属性
      const {displayName} = childElement.type;
      if(displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index
        });
        // 为每一项，自动添加index，用到的方法就是React.cloneElement
        // 第一个参数是想要克隆的元素，第二个参数是想要添加的属性
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem')
      }
    })
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu';

export default SubMenu;