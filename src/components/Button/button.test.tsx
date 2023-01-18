import React from "react";
import {render, screen} from '@testing-library/react';
import Button from "./button";

test('our first react test case', () => {
  render(<Button>Nice</Button>);
  const element = screen.queryByText('Nice');
  expect(element).toBeTruthy();
});
// 首先在屏幕上render组件
// 然后期待组件的text和我们写的组件的children一样
// 最后期待这个断言，是true

// 三个引入： 引入react，引入testing library里的render方法，引入Button组件