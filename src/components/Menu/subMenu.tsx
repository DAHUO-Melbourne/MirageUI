import React, {useContext, useState, FunctionComponentElement} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import {MenuItemProps} from './menuItem';
import Icon from '../Icon/Icon';
import { CSSTransition } from 'react-transition-group';
import Transition from '../Transition/Transition';

export interface SubMenuProps { 
  index?: string;
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
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubmenus as Array<string>;
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
  const [menuOpen, setMenuOpen] = useState(isOpened);
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
    'menu-opened': menuOpen,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  })

  const renderChildren = () => {
    const childrenComponent =  React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      // 进行类选断言以拿到type属性
      const {displayName} = childElement.type;
      if(displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
        // 为每一项，自动添加index，用到的方法就是React.cloneElement
        // 第一个参数是想要克隆的元素，第二个参数是想要添加的属性
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem')
      }
    })
    return (
      <Transition
        in={menuOpen}
        // menuOpen为true，则开始添加动画效果-enter路线。false则添加-exit路线
        // dropdown的显示和隐藏是靠类名来决定的，但是这样很影响className的复用。
        // 现在我们做个更改：通过一prop，来让他in为true则显示子元素，in为false则隐藏子元素
        // 这个prop的名字就是unmountOnExit，unmountOnExit默认为false，但是如果为true，意思就是当类名为*-exit-done，则隐藏子元素
        timeout={300}
        // 300ms以后开始进行动画过程(即添加enter(exit)等类)
        appear
        animation='zoom-in-bottom'
        // 使用zoom-in-top-enter; zoom-in-top-enter-active; zoom-in-top-exit; zoom-in-top-exit-active来添加动画。一般是在active上添加transition
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
        <Icon icon='angle-down' className='arrow-icon' />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu';

export default SubMenu;
