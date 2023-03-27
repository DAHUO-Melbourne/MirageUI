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
import React, { useState, useEffect, useRef } from 'react';
import Input from '../Input/Input';
import Icon from '../Icon/Icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import classNames from 'classnames';
import Transition from '../Transition/Transition';
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(''), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highLightIndex = _d[0], setHighLightIndex = _d[1];
    var triggerCurrent = useRef(false);
    var componentRef = useRef(null);
    var debounceValue = useDebounce(inputValue, 500);
    var _e = useState(false), showDropdown = _e[0], setShowDropdown = _e[1];
    useClickOutside(componentRef, function () { return setSuggestions([]); });
    // 500ms以后才设置debounceValue的值
    useEffect(function () {
        if (debounceValue && triggerCurrent.current) {
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                // 判断results是不是一个promise
                console.log('triggered');
                results.then(function (data) {
                    setSuggestions(data);
                    setLoading(false);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(results);
                setShowDropdown(true);
            }
        }
        else {
            setShowDropdown(false);
        }
        setHighLightIndex(-1);
    }, [debounceValue]);
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var handleChange = function (e) {
        setLoading(true);
        var value = e.target.value;
        setInputValue(value);
        triggerCurrent.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerCurrent.current = false;
    };
    var highLight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighLightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                // 回车
                if (suggestions[highLightIndex]) {
                    handleSelect(suggestions[highLightIndex]);
                }
                break;
            case 38:
                // 向上
                highLight(highLightIndex - 1);
                break;
            case 40:
                // 向下
                highLight(highLightIndex + 1);
                break;
            case 27:
                // esc
                setShowDropdown(false);
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () { return setSuggestions([]); } },
            React.createElement("ul", { className: "mirage-suggestion-list" },
                loading &&
                    React.createElement("div", { className: "suggstion-loading-icon" },
                        React.createElement(Icon, { icon: "spinner", spin: true })),
                suggestions.map(function (item, index) {
                    var cnames = classNames('suggestion-item', {
                        'item-highlighted': index === highLightIndex
                    });
                    return (React.createElement("li", { key: index, className: cnames, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: 'mirage-auto-complete', ref: componentRef, "data-testid": 'mirage-auto-complete' },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        suggestions.length > 0 && generateDropdown()));
};
export default AutoComplete;
