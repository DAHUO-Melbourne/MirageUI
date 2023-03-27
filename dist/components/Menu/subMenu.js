var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';
export var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, className = _a.className, children = _a.children;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubmenus;
    var isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    var _b = useState(isOpened), menuOpen = _b[0], setMenuOpen = _b[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
    });
    var handleClick = function (e) {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setMenuOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    // 返回一个object用以传入不同的属性：事件处理函数
    var subMenuClasses = classNames('mirage-submenu', {
        'menu-opened': menuOpen,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
    });
    var renderChildren = function () {
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            // 进行类选断言以拿到type属性
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i)
                });
                // 为每一项，自动添加index，用到的方法就是React.cloneElement
                // 第一个参数是想要克隆的元素，第二个参数是想要添加的属性
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem');
            }
        });
        return (React.createElement(Transition, { in: menuOpen, 
            // menuOpen为true，则开始添加动画效果-enter路线。false则添加-exit路线
            // dropdown的显示和隐藏是靠类名来决定的，但是这样很影响className的复用。
            // 现在我们做个更改：通过一prop，来让他in为true则显示子元素，in为false则隐藏子元素
            // 这个prop的名字就是unmountOnExit，unmountOnExit默认为false，但是如果为true，意思就是当类名为*-exit-done，则隐藏子元素
            timeout: 300, 
            // 300ms以后开始进行动画过程(即添加enter(exit)等类)
            appear: true, animation: 'zoom-in-bottom' },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: 'submenu-title' }, clickEvents),
            title,
            React.createElement(Icon, { icon: 'angle-down', className: 'arrow-icon' })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
