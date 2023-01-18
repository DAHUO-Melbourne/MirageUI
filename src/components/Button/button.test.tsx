import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import Button, {ButtonType, ButtonSize, ButtonProps} from "./button";
const defaultProps = {
  onClick: jest.fn()
  // 创建一个被监控的模拟函数
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

test('our first react test case', () => {
  render(<Button>Nice</Button>);
  const element = screen.queryByText('Nice');
  expect(element).toBeTruthy();
  expect(element).toBeInTheDocument();
});

describe('test Button component', () => {
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Nice</Button>);
    const element = screen.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  // 测试默认的button的render出来的type需要是一个button，类名需要是btn btn-default
  // 并且用模拟的fireEvent来模拟用户事件。
  // 通过展开defaultProps来为组件添加props
  it('should render the correct component based on different props', () => {});
  it('should render a link when btnType equals link and href props', () => {});
  it('should render disable button when disabled set to be true', () => {
    render(<Button {...disabledProps}>Nice</Button>);
    const element = screen.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });
  // 通过控制传入参数的方法来模拟，并通过jest内建函数的方法来获取这个组件是否如你所愿的去表现。
})
// 首先在屏幕上render组件
// 然后期待组件的text和我们写的组件的children一样
// 最后期待这个断言，是true

// 三个引入： 引入react，引入testing library里的render方法，引入Button组件