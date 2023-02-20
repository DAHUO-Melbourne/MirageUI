import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Upload from './Upload'

const SimpleUpload = () => {
  return (
    <Upload
      action='https://jsonplaceholder.typicode.com/posts'
      onProgress={action('progess')}
      onSuccess={action('success')}
      onError={action('error')}
    />
  )
}

storiesOf('Upload modules', module)
  .add('Upload', SimpleUpload);