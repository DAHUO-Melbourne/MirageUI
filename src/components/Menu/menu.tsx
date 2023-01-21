import React, {useState, createContext} from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';
// 字符自变量可以代替枚举类型，写起来更方便。

type onSelectCallback = (selectedIndex: number) => void;

interface MenuProps {
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
    'menu-vertical': mode === 'vertical'
  })
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu;
