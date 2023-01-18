import React from "react";
import {render, screen} from '@testing-library/react';
import Button from "./button";

test('our first react test case', () => {
  render(<Button>Nice</Button>);
  const element = screen.queryByText('Nice');
  expect(element).toBeTruthy();
  expect(element).toBeInTheDocument();
});

describe('test Button component', () => {
  it('should render the correct default button', () => {
    render(<Button>Nice</Button>);
    const element = screen.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element.tagName).toHaveClass('btn btn-default');
  });
  // 测试默认的button的render出来的type需要是一个button，类名需要是btn btn-default
  it('should render the correct component based on different props', () => {});
  it('should render a link when btnType equals link and href props', () => {});
  it('should render disable button when disabled set to be true', () => {});
})
// 首先在屏幕上render组件
// 然后期待组件的text和我们写的组件的children一样
// 最后期待这个断言，是true

// 三个引入： 引入react，引入testing library里的render方法，引入Button组件