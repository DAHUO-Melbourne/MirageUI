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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classNames from 'classnames';
// 因为我们的组件里包含了button的属性，也包含了anchor的属性。所以当我们要做一个button的时候，很多anchor的属性我们就没法传入。这个时候就会报错。
// 解决的办法是： 给所有的属性设置成可选属性，也就是partial
/**
 * Button element used to be pressed
 * ### import method
 * ```js
 * import {Button} from 'MirageUI'
 * ```
 * 这种是JSDoc格式的注释。添加注释以后可以自动给storybook添加文档
 */
export var Button = function (_a) {
    var _b;
    var 
    // 需要将Button本身也导出(这一步是为了storybook，只有这样storybook才能自动获取到我们写的button的各自参数以及取值，从而自动在storybook页面上生成参数列表)
    className = _a.className, disabled = _a.disabled, size = _a.size, btnType = _a.btnType, children = _a.children, href = _a.href, rest = __rest(_a, ["className", "disabled", "size", "btnType", "children", "href"]);
    var classes = classNames('btn', className, (_b = {},
        _b["btn-".concat(btnType)] = btnType,
        _b["btn-".concat(size)] = size,
        _b['disabled'] = btnType === 'link' && disabled,
        _b));
    // 使用classNames包来拼接字符串，根据不同参数引入生成对应的classNames。
    // 其中disabled类名专用于link类型的button，因为link类型的button的样式的disabled只能由className来处理因为a tag没有disabled的属性。
    if (btnType === 'link' && href) {
        return (React.createElement("a", __assign({ href: href, className: classes }, rest), children));
    }
    else {
        return (React.createElement("button", __assign({ className: classes, disabled: disabled }, rest), children));
    }
};
Button.defaultProps = {
    disabled: false,
    btnType: 'default',
};
export default Button;
