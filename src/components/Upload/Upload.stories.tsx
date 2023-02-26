import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Icon from '../Icon/Icon'
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
      // beforeUpload={filePromise}
      onChange={action('changed')}
      name='fileName'
      data={{'key': 'value'}}
      headers={{'X-powered-By': 'mirage'}}
      accept='.jpg'
      multiple
    >
    </Upload>
  )
}

export const CDragUpload = (args: any) => (
  <Upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    onChange={action('changed')}
    onRemove={action('removed')}
    name="fileName"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br/>
    <p>drag file here to upload</p>
  </Upload>
)
CDragUpload.storyName = '拖动上传'

storiesOf('Upload modules', module)
  .add('Upload', CDragUpload);
  // .add('Upload', SimpleUpload);
  