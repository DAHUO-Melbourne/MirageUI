import {FC} from 'react';
import Menu, {MenuProps} from './menu';
import SubMenu, {SubMenuProps} from './subMenu';
import MenuItem, {MenuItemProps} from './menuItem';

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>,
}
/**
 * 这是一个联合类型，使用&来拼接多种类型
 * 第一部分是一个functional component, 参数的类型为MenuProps
 * 第二部分是一个object，里面有两个key，他们的值的类型都是functional component, 参数类型分别是MenuItemProps和SubMenuProps
 */

const TransMenu = Menu as IMenuComponent;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
