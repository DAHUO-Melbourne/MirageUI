import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Upload, { UploadFile } from './Upload'

const defaultFileList: UploadFile[] = [
  {uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30},
  {uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30},
  {uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30},
]

const SimpleUpload = () => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big')
      return false;
    }
    return true;
  };

  const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docs', {type: file.type});
    return Promise.resolve(newFile);
  };

  return (
    <Upload
      action='https://jsonplaceholder.typicode.com/posts'
      onProgress={action('progess')}
      onSuccess={action('success')}
      onError={action('error')}
      defaultFileList={defaultFileList}
      // beforeUpload={checkFileSize}
      beforeUpload={filePromise}
      onChange={action('changed')}
    />
  )
}

storiesOf('Upload modules', module)
  .add('Upload', SimpleUpload);