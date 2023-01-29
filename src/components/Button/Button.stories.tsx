// 决定storybook加载哪些case的，是靠main.js

import React from "react";
import Button from "./button";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const buttonMeta: ComponentMeta<typeof Button> = {
  title: 'Mirage Button',
  component: Button
}
// 相当于是确定这一个section的名称叫Mirage Button，接下来要渲染的storybook全是Button

export default buttonMeta;

export const Default: ComponentStory<typeof Button> = () => (
  <Button>Default Button</Button>
);
Default.storyName='Default Button';
// 假如不添加这一属性的话，storyName的名称自动是你的函数名称，也就是Default

// 这种写法(：ComponentStory) = () => ()的就是让storybook渲染这一种的组件类型

export const ButtonWithSize: ComponentStory<typeof Button> = () => (
  <>
    <Button size="lg">Large Button</Button>
    <Button size="sm">Small Button</Button>
  </>
);
ButtonWithSize.storyName='Button With Size';

export const ButtonWithType: ComponentStory<typeof Button> = () => (
  <>
    <Button btnType="primary">Primary Button</Button>
    <Button btnType="danger">Danger Button</Button>
    <Button btnType="link" href='https://www.google.com.au'>Link Button</Button>
  </>
);
ButtonWithType.storyName='Button With different types';