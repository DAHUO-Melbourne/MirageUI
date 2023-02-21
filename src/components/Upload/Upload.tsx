import React, {ChangeEvent, FC, useRef} from 'react'
import axios from 'axios';

import Button from '../Button/button';

export interface UploadProps {
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  beforeUpload?: (p: File) => boolean | Promise<File>;
  // 用处是让用户在上传之前，可以先验证文件的类型（Boolean），或者对文件类型进行转换（Promise）。
  onChange?: (p: File) => void;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
      // fileInput.current.click函数就是点击以后，触发input的click事件
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return
    };
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    // 使用Array.from将files从FileList类型转化为list数组，然后就可以使用forEach
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          // 如果文件是promise类型的话，那么就发送文件
          result.then(processFile => {
            post(processFile);
          })
        } else if (result !== false) {
          // 如果返回值是布尔类型，那么如果结果是true。直接发送
            post(file);
        }
      }
    })
  }

  const post = (file: File) => {
      const formData = new FormData();
      formData.append(file.name, file);
      axios.post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          console.log(e);
          // @ts-ignore
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            onProgress && onProgress(percentage, file);
          }
        }
      }).then((resp) => {
        console.log(resp);
        onSuccess && onSuccess(resp.data, file)
        onChange && onChange(file);
      }).catch((err) => {
        console.error(err);
        onError && onError(err, file);
        onChange && onChange(file);
      })
  }

  return (
    <div
      className='mirage-upload-component'
    >
      <Button
        btnType='primary'
        onClick={handleClick}
      >
        Upload File
      </Button>
      <input
        className='mirage-file-input'
        style={{display: 'none'}}
        ref={fileInput}
        onChange={handleFileChange}
        type='file'
      />
    </div>
  )
}

export default Upload;
