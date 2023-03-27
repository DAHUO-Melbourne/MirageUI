import React, { FC } from 'react';
export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    beforeUpload?: (p: File) => boolean | Promise<File>;
    onChange?: (p: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    children: React.ReactNode;
    drag?: boolean;
}
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export declare const Upload: FC<UploadProps>;
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
