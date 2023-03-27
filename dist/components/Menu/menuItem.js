import classNames from 'classnames';
import React, { useContext } from 'react';
import { MenuContext } from './menu';
export var MenuItem = function (_a) {
    var index = _a.index, className = _a.className, disabled = _a.disabled, style = _a.style, children = _a.children;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index,
    });
    var handleClick = function () {
        context.onSelect && !disabled && index && context.onSelect(index);
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
// displayName是一个React节点的属性。用于调试用。
MenuItem.defaultProps = {
    disabled: false,
};
export default MenuItem;
