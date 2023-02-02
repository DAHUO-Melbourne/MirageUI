// 决定storybook加载哪些case的，是靠main.js

import React from "react";
import Button from "./button";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import mdx from "./Button.mdx";

const buttonMeta: ComponentMeta<typeof Button> = {
  title: 'Mirage Button',
  component: Button,
  parameters: {
    docs: {
      page: mdx
      // 指定具体的mdx文件作为文档, 使用ArgsTable来显示参数，使用Canvas和Story来render组件
    }
  }
}
// 相当于是确定这一个section的名称叫Mirage Button，接下来要渲染的storybook全是Button

export default buttonMeta;

// 为了解决代码复用的问题，我们决定使用模板去渲染button的基本样式，通过修改参数来渲染不同的button：
export const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>
)
export const Default = Template.bind({});
// 第一步创建一个函数的副本：
Default.args = {
  children: 'Default Button'
}
// 修改args来调整render的具体样式结果
Default.storyName='Default';
/** decorator的作用是在storybook中渲染的组件dom中，添加一些外部容器样式来让他变得更整洁
 * 语法就是数组，里面可以添加很多项
 * 参数是一个组件，返回另一个组件：(Story)就是一个组件，=> () 返回的就是另一个组件，在返回的组件外面加一层div来包裹，里面添加margin
 */
Default.decorators = [
  (Story) => (
    <div style={{margin: 50}}><Story /></div>
  )
];



export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  children: 'Large Button'
}
Large.storyName='Large';

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  children: 'Small Button'
}
Small.storyName='Small';

export const Primary = Template.bind({});
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button'
}
Primary.storyName='Primary';

export const Danger = Template.bind({});
Danger.args = {
  btnType: 'danger',
  children: 'Danger Button'
}
Danger.storyName='Danger';

export const Link = Template.bind({});
Link.args = {
  btnType: 'link',
  href: 'https://www.google.com',
  children: 'Link Button'
}
Link.storyName='Link';
