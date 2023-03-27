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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './UploadList';
import Dragger from './Dragger';
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList !== null && defaultFileList !== void 0 ? defaultFileList : []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        // Partial意思是值可以是UploadFile的一部分field，不用是全部的field
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                // map返回的是一个新数组，所以就没有在原数组之上更新。
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    console.log(fileList);
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
            // fileInput.current.click函数就是点击以后，触发input的click事件
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        ;
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        // 使用Array.from将files从FileList类型转化为list数组，然后就可以使用forEach
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    // 如果文件是promise类型的话，那么就发送文件
                    result.then(function (processFile) {
                        post(processFile);
                    });
                }
                else if (result !== false) {
                    // 如果返回值是布尔类型，那么如果结果是true。直接发送
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                console.log(e);
                // @ts-ignore
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    // setFileList((prevList) => {
                    //   console.log(prevList);
                    //   // 这种方法可以拿到最新的状态值。通过传入一个函数，参数就是最新的这个state的值。然后return的是更新完成之后的值。
                    //   // 注意：用这种方法不可以直接更新prevList，这样更新会失败。判断是否是不同的变量，方法是根据object.is
                    //   return prevList;
                    // })
                    onProgress && onProgress(percentage, file);
                }
            }
        }).then(function (resp) {
            updateFileList(_file, { status: 'success', response: resp.data });
            console.log(resp);
            onSuccess && onSuccess(resp.data, file);
            onChange && onChange(file);
        }).catch(function (err) {
            updateFileList(_file, { status: 'error', error: err });
            console.error(err);
            onError && onError(err, file);
            onChange && onChange(file);
        });
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
            // 使用filter来指定删除数组某一项
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    return (React.createElement("div", { className: 'mirage-upload-component', onClick: handleClick },
        drag ?
            React.createElement(Dragger, { onFile: function (files) { return uploadFiles(files); } }, children) :
            children,
        React.createElement("input", { className: 'mirage-file-input', "data-testid": 'mirage-file-input', style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, type: 'file', accept: accept, multiple: multiple }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
/**
 * 新需求分析
 * 1. 可以自定义api的header的内容
 * 2. 添加自定义name field
 * 3. 添加自定义的附加信息 form data
 * 4. 添加发送时是否携带cookie
 * 5. 允许同时选择多个文件一起上传
 * 6. 添加accepted文件类型
 */ 
