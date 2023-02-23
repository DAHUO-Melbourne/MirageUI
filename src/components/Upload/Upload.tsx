import React, {ChangeEvent, FC, useRef, useState} from 'react'
import axios from 'axios';
import UploadList from './UploadList';
import Button from '../Button/button';

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  beforeUpload?: (p: File) => boolean | Promise<File>;
  // 用处是让用户在上传之前，可以先验证文件的类型（Boolean），或者对文件类型进行转换（Promise）。
  onChange?: (p: File) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: {[key: string]: any};
  name?: string;
  data?: {[key: string]: any};
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
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
    defaultFileList,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList ?? []);

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
      setFileList(prevList => {
        return [_file, ...prevList];
      });
      const formData = new FormData();
      formData.append(name || 'file', file);
      if (data) {
        Object.keys(data).forEach(key => {
          formData.append(key, data[key])
        })
      }
      axios.post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
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

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
      // 使用filter来指定删除数组某一项
    })
    if (onRemove) {
      onRemove(file)
    }
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
        accept={accept}
        multiple={multiple}
      />
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

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