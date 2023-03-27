import React, { useState, createContext } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({ index: '0' });
// 因为onSelect函数需要传递给下面的子组件，但是子组件叫children，所以无法接收。
// 这种情况下就应该使用createContext来传递参数
// 这里是创建了一个context，并赋初值：{index: 0}
// 函数体中，可以根据具体参数的情况，来修改context里的内容
// 这里只是创建，类似useState, 其中不知有context的值，他同时也创建了provider和consumer
export var Menu = function (_a) {
    var defaultIndex = _a.defaultIndex, className = _a.className, mode = _a.mode, style = _a.style, onSelect = _a.onSelect, children = _a.children, defaultOpenSubmenus = _a.defaultOpenSubmenus;
    var _b = useState(defaultIndex), currentActive = _b[0], setCurrentActive = _b[1];
    var handleClick = function (index) {
        setCurrentActive(index);
        onSelect && onSelect(index);
    };
    var passedContext = {
        index: currentActive !== null && currentActive !== void 0 ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubmenus: defaultOpenSubmenus,
    };
    // 这才是他value的值
    var classes = classNames('mirage-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            // 进行类选断言以拿到type属性
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString(),
                });
                // 为每一项，自动添加index，用到的方法就是React.cloneElement
                // 第一个参数是想要克隆的元素，第二个参数是想要添加的属性
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem');
            }
        });
    };
    // renderChildren函数的作用是：规定了Menu里的元素，必须是MenuItem这个元素。检测的方法就是所有的MenuItem人为设定了一个属性：displayName = 'MenuItem'
    // 我们测试的第一个任务是判断Menu中每一项子组件的类型，必须是MenuItem这个元素
    // 一开始我们觉得可以使用children.map，但是这很危险因为children是不透明的，children可以是一个数组也可以是一个函数。如果是函数的话，我们在函数上调用map方法就会报错
    // 因此我们可以使用React.Children.map方法，来保证一旦遇到不合适的类型，react可以跳过
    return (React.createElement("ul", { className: classes, style: style, "data-testid": 'test-menu' },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubmenus: [],
};
export default Menu;
