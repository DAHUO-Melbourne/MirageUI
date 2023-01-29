import { Library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import '../src/styles/index.scss';
// 因为storybook是一个独立于app.tsx运行的东西，所以需要将样式等引入，
// 添加在preview文件里来提前引入这些样式，以保证css样式和app中的完全一致

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}