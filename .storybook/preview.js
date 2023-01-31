import { Library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import '../src/styles/index.scss';
// 因为storybook是一个独立于app.tsx运行的东西，所以需要将样式等引入，
// 添加在preview文件里来提前引入这些样式，以保证css样式和app中的完全一致

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // 所有以on开头的事件都会被自动记录，所以onSelect才会被记下来
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
      // color 和 date，都是storybook里控制输入类型的控件类型
      // 比如说如果是color就意味着输入的值必须是hex value，如果是date就必须是date value
      // 这里的语法意思是，如果你在代码里配置控件类型，只要你输入background/color，那么就会采用color 控件类型
      // 如果输入Date，那么就会采用date控件类型
    },
  },
}