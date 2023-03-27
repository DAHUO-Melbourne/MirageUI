import Menu from './menu';
import SubMenu from './subMenu';
import MenuItem from './menuItem';
/**
 * 这是一个联合类型，使用&来拼接多种类型
 * 第一部分是一个functional component, 参数的类型为MenuProps
 * 第二部分是一个object，里面有两个key，他们的值的类型都是functional component, 参数类型分别是MenuItemProps和SubMenuProps
 */
var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;
