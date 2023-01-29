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

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass',
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
  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>Nice</Button>);
    // 通过改变button的props的值从而修改测试的button的类型，这样render出来的就是你需要测试的类型: 比如说Primary + Large
    const element = screen.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg klass');
    // 如果primary && large类型的button成功render，那么它的className就应该是btn-primary btn-lg，且应该还有传入的参数className：klass

  });
  it('should render a link when btnType equals link and href props', () => {
    render(<Button btnType='link' href='http://dummyurl' >Link</Button>);
    const element = screen.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });
  it('should render disable button when disabled set to be true', () => {
    render(<Button {...disabledProps}>Nice</Button>);
    const element = screen.getByText('Nice') as HTMLButtonElement;
    // 类型断言：原来的element的类型是一个HTMLElement，但是HTMLElement不一定有disabled属性(见后两行)。为了拿到这个属性需要用到类型断言。
    // 类型断言的意思就是，当A类型包含了B类型，也包含了C类型，D类型，是一个不同类型的集合。但是我们在使用的时候，需要让他指定为其中一个子类型
    // 这个时候就可以用到as断言
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