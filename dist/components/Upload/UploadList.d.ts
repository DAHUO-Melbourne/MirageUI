import React from 'react';
import { UploadFile } from './Upload';
interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
export declare const UploadList: React.FC<UploadListProps>;
export default UploadList;
