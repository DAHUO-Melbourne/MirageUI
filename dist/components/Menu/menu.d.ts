import React from 'react';
type MenuMode = 'horizontal' | 'vertical';
type onSelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: onSelectCallback;
    children?: React.ReactNode;
    defaultOpenSubmenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: onSelectCallback;
    mode?: MenuMode;
    defaultOpenSubmenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
export declare const Menu: React.FC<MenuProps>;
export default Menu;
