import React, {ChangeEvent, FC, useRef, useState} from 'react'
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
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    // Partial意思是值可以是UploadFile的一部分field，不用是全部的field
    setFileList(prevList => {
      return prevList.map(file => {
        // map返回的是一个新数组，所以就没有在原数组之上更新。
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  console.log(fileList);

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
      let _file: UploadFile = {
        uid: Date.now() + 'upload-file',
        status: 'ready',
        name: file.name,
        size: file.size,
        percent: 0,
        raw: file,
      }
      setFileList([_file, ...fileList]);
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
            updateFileList(_file, { percent: percentage, status: 'uploading'});
            // setFileList((prevList) => {
            //   console.log(prevList);
            //   // 这种方法可以拿到最新的状态值。通过传入一个函数，参数就是最新的这个state的值。然后return的是更新完成之后的值。
            //   // 注意：用这种方法不可以直接更新prevList，这样更新会失败。判断是否是不同的变量，方法是根据object.is
            //   return prevList;
            // })
            onProgress && onProgress(percentage, file);
          }
        }
      }).then((resp) => {
        updateFileList(_file, {status: 'success', response: resp.data})
        console.log(resp);
        onSuccess && onSuccess(resp.data, file)
        onChange && onChange(file);
      }).catch((err) => {
        updateFileList(_file, { status: 'error', error: err})
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
