import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Menu from "./menu";
import SubMenu from "./subMenu";
import MenuItem from "./menuItem";

const menuMeta: ComponentMeta<typeof Menu> =  {
  title: 'Menu',
  id: 'Menu',
  component: Menu,
  subcomponents: {'SubMenu': SubMenu, 'MenuItem': MenuItem},
  // 此处是设置这一个组件的子组件的固定类型，于是在doc文档里也会出现子组件的类型
  args: {
    defaultIndex: '1',
  },
  // 也可以使用args在ComponentMeta中设置args的默认值。
  // 但是这里默认值的优先级低于下面component的.args设置的值，具体的component的args设置的值是可以覆盖default的值的

  argTypes: {
    defaultIndex: {
      control: 'color',
      description: 'normal text',
      // 出现在类型上有一行描述，来解释defaultIndex这个属性是干啥的，我们给description里设置的内容就是normal text，这个开发者爱写什么写什么
    }
  },
  // 也可以在menuMeta上进行设置

  parameters: {
    controls: {
      matchers: {
        date: /mode$/,
        // 我们希望将‘mode’属性设置为date类型的输入类型，于是如果想要修改mode的值，就只能输入date类型的值了
      }
    }
  }
}

/**
 * 插件的集合有：doc/control/actions/viewport/backgrounds/toolbars && globals/measure && outline
 * https://storybook.js.org/docs/react/essentials/introduction
 */

export default menuMeta;

export const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu defaultIndex='0' {...args} >
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem> 
    <SubMenu title="下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
      </MenuItem>    
    </SubMenu>
  </Menu>
);

export const DefaultMenu = Template.bind({});
DefaultMenu.storyName='Default Menu'

export const VerticalMenu = Template.bind({});
VerticalMenu.args = {
  mode: 'vertical',
  defaultIndex: '0',
}
// 此处的args的值的优先级高于menuMeta中的args的优先级设置

VerticalMenu.argTypes = {
  defaultIndex: {
    control: 'color'
  }
}
// argTypes的作用是调整storyBook文档中对于不同属性的类型的判断的。
// 首先：这些属性的类型是storybook根据程序的逻辑自行推断出来的，难免会有一些失误的地方
// 当我们觉得他文档中给出的类型有误，我们就可以使用argTypes来一个个设置不同属性的类型。具体的就是通过control属性来设置
// https://storybook.js.org/docs/react/essentials/controls

VerticalMenu.parameters = {
  backgrounds: {
    values: [
      {name: 'red', value: '#f00'},
      {name: 'green', value: '#0f0'}
    ]
  }
}

VerticalMenu.storyName='Vertical Menu'