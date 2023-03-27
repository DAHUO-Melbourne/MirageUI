import React, { useState } from 'react';
import classNames from 'classnames';
export var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var classes = classNames('mirage-uploader-dragger', {
        'is-dragover': dragOver
    });
    var handleDragOver = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    var handleDragLeave = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: classes, onDragOver: function (e) { return handleDragOver(e, true); }, onDragLeave: function (e) { return handleDragLeave(e, false); }, onDrop: handleDrop }, children));
};
export default Dragger;
