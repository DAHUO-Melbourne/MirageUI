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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import React, { createContext, forwardRef, useImperativeHandle } from 'react';
import useStore from './useStore';
export var FormContext = createContext({});
var Form = forwardRef(function (props, ref) {
    var name = props.name, children = props.children, initialValues = props.initialValues, onFinish = props.onFinish, onFinishFailed = props.onFinishFailed;
    var _a = useStore(initialValues), form = _a.form, fields = _a.fields, dispatch = _a.dispatch, restProps = __rest(_a, ["form", "fields", "dispatch"]);
    var validateField = restProps.validateField, validateAllField = restProps.validateAllField;
    useImperativeHandle(ref, function () {
        return __assign({}, restProps);
    });
    /**
     * 第一个参数是ref，第二个参数是想从这个ref中暴露出去的属性与方法
     * 那些不在回调函数中返回的东西，就不会被拿到了
     * 所以useImperativeHandle可以选择性暴露一部分ref的内容，这样不用将整个ref暴露出，对性能和安全性更好
     * 或者是人工的添加一些dom里原生属性没有，但是我们自己写的函数到回调函数里返回出去。这样好处也是更安全，而且有了自定义，拿到的东西更多样
     * 这样更自由，更安全
     */
    var passedContext = {
        dispatch: dispatch,
        fields: fields,
        initialValues: initialValues,
        validateField: validateField,
    };
    // 这是要传递的context的值
    var submitForm = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, isValid, errors, values;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    e.stopPropagation();
                    return [4 /*yield*/, validateAllField()];
                case 1:
                    _a = _b.sent(), isValid = _a.isValid, errors = _a.errors, values = _a.values;
                    if (isValid && onFinish) {
                        onFinish(values);
                    }
                    else if (!isValid && onFinishFailed) {
                        onFinishFailed(values, errors);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var childrenNode;
    if (typeof (children) === 'function') {
        childrenNode = children(form);
    }
    else {
        childrenNode = children;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { name: name, className: 'mirage-form', onSubmit: submitForm },
            React.createElement(FormContext.Provider, { value: passedContext }, childrenNode)),
        React.createElement("div", null,
            React.createElement("pre", { style: { whiteSpace: 'pre-wrap' } }, JSON.stringify(fields)),
            React.createElement("pre", { style: { whiteSpace: 'pre-wrap' } }, JSON.stringify(form)))));
});
Form.defaultProps = {
    name: 'mirage-form'
};
export default Form;
/**
 * 如果打算把组件内部的ref，暴露给其他组件使用，使得其他组件也可以控制这一组件的dom，实现不同子组件dom的自定义
 * 就要使用到forwardRef
 * 顾名思义。意思就是将ref，forward给其他组件
 */
/**
 * forwardRef的用法就是
 * 1. 使用forwardRef来包裹一个函数：
 *    forwardRef(() => {
 *      return (
 *        <></>
 *      )
 *    })
 * 2. 参数必须是props, ref
 *    forwardRef((props, ref) => {
 *      return (
 *        <></>
 *      )
 *    })
 * 3. 类型声明必须是ref的类型在前，props类型在后：
 *    forwardRef<HTMLFormElement, FormProps>((props, ref) => {
 *      return (
 *        <></>
 *      )
 *    })
 */
/**
 * forwardRef返回的是dom节点，但是如果我们不想返回这个dom节点，而是想返回一些自定义的属性
 * 这个时候就用到useImperativeHandle
 * useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
   }, []);
   回调函数里返回的是暴露出去的方法，这里相当于只暴露出了focus方法，其他的方法不暴露。
   useImperativeHandle的回调函数里也可以暴露用户自己写的函数，不一定非得是dom inbuild的自带的方法
  */ 
