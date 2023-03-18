import React from 'react'
import axios from 'axios'
import { render, RenderResult, fireEvent, waitFor, screen } from '@testing-library/react'

import { Upload, UploadProps } from './Upload';

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  };
});

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>
// 使用Jest模拟axios

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
  children: <></>
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement

const testFile = new File(['xyz'], 'test.png', {type: 'image/png'});
// 模拟新建一个文件

const setUp = () => {
  render(<Upload {...testProps}>Click to upload</Upload>);
  fileInput = screen.getByTestId('mirage-file-input');
  // uploadArea = screen.queryByText('Click to upload');
}

describe('test upload component', () => {
  beforeEach(() => {
    setUp();
  })
  it('upload progress should work fine', async () => {
    // 写法1
    mockedAxios.post.mockImplementation(() => {
      return Promise.resolve({'data': 'cool'});
    })
    // 模拟post action返回的结果
    // 写法2
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText('Click to upload')).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, {target: {files: [testFile]}});
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText('spinner')).toBeInTheDocument();
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByText('test.png')).toBeInTheDocument();
    })
    // 使用waitFor来await获取异步结果
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText('check-circle')).toBeInTheDocument();
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile);
    // 参数是onSuccess函数的参数，也就是onSuccess('cool');
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    //remove the uploaded file 测试删除
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByText('times')).toBeInTheDocument()
    fireEvent.click(screen.getByText('times'))
    expect(screen.queryByText('test.png')).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }))
  });

  it('drag and drop files should works fine', async () => {
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    // const mockDropEvent = createEvent.drop(uploadArea)
    // Object.defineProperty(mockDropEvent, "dataTransfer", {
    //   value: {
    //     files: [testFile]
    //   }
    // })
    // fireEvent(uploadArea, mockDropEvent)
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile]
      }
    })
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByText('test.png')).toBeInTheDocument()
      // expect(wrapper.queryByText('check-circle')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))
  })
})