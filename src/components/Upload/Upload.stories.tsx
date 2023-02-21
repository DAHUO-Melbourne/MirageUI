import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Upload from './Upload'

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
      // beforeUpload={checkFileSize}
      beforeUpload={filePromise}
      onChange={action('changed')}
    />
  )
}

storiesOf('Upload modules', module)
  .add('Upload', SimpleUpload);