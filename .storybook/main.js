module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    // 加载src下的，所有以.stories.mdx命名的文件
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
    // 以及加载src下的，所有以.stories.js/jsx/ts/tsx命名的文件
    // 作为story的来源
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}