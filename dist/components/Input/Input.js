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
import classNames from 'classnames';
import React from 'react';
import Icon from '../Icon/Icon';
;
/**
 * input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装
 *
 * ~~~js
 * // 这样引用
 * import {Input} from "MirageUI";
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export var Input = function (_a) {
    var _b;
    var disabled = _a.disabled, size = _a.size, icon = _a.icon, prepend = _a.prepend, append = _a.append, style = _a.style, value = _a.value, onChange = _a.onChange, restProps = __rest(_a, ["disabled", "size", "icon", "prepend", "append", "style", "value", "onChange"]);
    var className = classNames('mirage-input-wrapper', (_b = {},
        _b["input-size-".concat(size)] = size,
        _b['is-disabled'] = disabled,
        _b['input-group'] = prepend || append,
        _b['input-group-append'] = !!append,
        _b['input-group-prepend'] = !!prepend,
        _b));
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if (value) {
        delete restProps.defaultValue;
        value = fixControlledValue(value);
    }
    // 如果用户传入了value，那么就不再需要defaultValue这个属性了，需要删掉
    // 同时对value进行verify，如果value是undefined或者是null，就需要人为的将他的值改为空字符串''，否则如果初始值为undefined或者null，然后转化为string会报错
    return (React.createElement("div", { className: className, style: style },
        prepend && React.createElement("div", { className: 'mirage-input-group-prepend' }, prepend),
        icon && React.createElement("div", { className: 'icon-wrapper' },
            React.createElement(Icon, { icon: icon, title: "title-".concat(icon) })),
        React.createElement("input", __assign({ className: "mirage-input-inner", disabled: disabled, value: value, onChange: onChange }, restProps)),
        append && React.createElement("div", { className: "mirage-input-group-append" }, append)));
};
export default Input;
