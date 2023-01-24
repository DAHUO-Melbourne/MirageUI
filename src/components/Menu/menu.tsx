import React, {useState, createContext} from 'react';
import classNames from 'classnames';
import MenuItem, {MenuItemProps} from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
// 字符自变量可以代替枚举类型，写起来更方便。

type onSelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: onSelectCallback;
  children?: React.ReactNode;
}

interface IMenuContext {
  index: number;
  onSelect?: onSelectCallback
}

export const MenuContext = createContext<IMenuContext>({index: 0});
// 因为onSelect函数需要传递给下面的子组件，但是子组件叫children，所以无法接收。
// 这种情况下就应该使用createContext来传递参数
// 这里是创建了一个context，并赋初值：{index: 0}
// 函数体中，可以根据具体参数的情况，来修改context里的内容
// 这里只是创建，类似useState, 其中不知有context的值，他同时也创建了provider和consumer

const Menu: React.FC<MenuProps> = ({
  defaultIndex,
  className,
  mode,
  style,
  onSelect,
  children,
}: MenuProps) => {
  const [currentActive, setCurrentActive] = useState(defaultIndex);

  const handleClick = (index: number) => {
    setCurrentActive(index);
    onSelect && onSelect(index);
  }

  const passedContext: IMenuContext = {
    index: currentActive ?? 0,
    onSelect: handleClick,
  }
  // 这才是他value的值

  const classes = classNames('mirage-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      // 进行类选断言以拿到type属性
      const {displayName} = childElement.type;
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index
        });
        // 为每一项，自动添加index，用到的方法就是React.cloneElement
        // 第一个参数是想要克隆的元素，第二个参数是想要添加的属性
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem')
      }
    })
  }
  // renderChildren函数的作用是：规定了Menu里的元素，必须是MenuItem这个元素。检测的方法就是所有的MenuItem人为设定了一个属性：displayName = 'MenuItem'

  // 我们测试的第一个任务是判断Menu中每一项子组件的类型，必须是MenuItem这个元素
  // 一开始我们觉得可以使用children.map，但是这很危险因为children是不透明的，children可以是一个数组也可以是一个函数。如果是函数的话，我们在函数上调用map方法就会报错
  // 因此我们可以使用React.Children.map方法，来保证一旦遇到不合适的类型，react可以跳过

  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu;
