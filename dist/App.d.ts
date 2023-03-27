/// <reference types="react" />
declare function App(): JSX.Element;
export default App;
/**
 * 第八章讲述的是如何生成组件库的文档，其核心要求有：
 * 1. 能够展示组件在不同属性下的状态
 * 2. 能追踪组件在不同用户事件下的行为，并且具有调试功能
 * 3. 能自动生成文档 && 属性列表
 * 我们使用storybook：https://storybook.js.org/
 */
/**
 * 第十章：模拟服务器用到的工具一个是JSONPlaceholder
 * 另一个是Mocky.io
 */
/**
 * 第11章：表单
 * 结构应该是：最外层是一个Form，里面是通过Item来包裹不同的组件，比如说可以包裹input/button
 *
 * 管理Form以及FormItem的值，我们需要用到一个Form和FormItem都可以访问到的store来存储值。
 * 1. 第一步首先初始化store
 * 2. 当添加一个组件，就要往store里添加一条key value pair来管理他的值
 * 3. 更新值的时候，需要根据之前输入的key来更新他的value
 * 4. 当onBlur的时候可以通过key+ value以及rules来更新数据，这个rules是在添加组件的时候随着key value一起添加进store的
 * 例如： 'username': {name: 'username', value: '', rules: [], isValid: true}
 */
/**
 * 12-1
 * 1. 介绍js打包历史：
 *    commonjs的打包语法是通过require()来引入包，通过module.exports = function() {}来导出包，导出内容
 *    但是这一种方法更接近于服务器端
 * 2. es6模块的语法是：import来引入，export default来导出
 */
/**
 * 12-2
 * 1. 介绍了什么是bundler
 *    bundler就是一种打包工具，因为很多ES6对模块的运用：引入和导出都无法被浏览器处理，所以需要bundler工具来将浏览器不支持的模块编译转换合并，最后生成一个在浏览器端可以运行的代码
 *    webpack可以将不同种类的资源视作和js平等的模块，对外只暴露一个js文件
 * 2. 使用 npm webpack 文件名 来转译对应文件，就可以在目标目录里生成一个转译好的文件，然后在html模板中使用这一文件，就可以成功被浏览器读取了
 * 3. webpack的工作：（1）分析模块并进行合并
 *                  （2）提供这些模块能正常执行的环境
 *                  （3）也可以加载更多文件类型，比如说图片，css，svg等
 */
/**
 * 12-5
 * 我们是拿ts编写的项目，但是浏览器运行，需要转译成浏览器能读懂的格式，所以需要用到tsconfig转译文件
 * tsconfig.json这个配置文件是和开发环境相关的，这个文件管的是开发的时候ts编写规则，什么情况下应该报错，ts规范严格程度应该是多少
 * 而打包文件是tsconfig.build.json
 */
/**
 * 当你想测试你的组件库的包的时候：你可以有两种办法
 * 1. 发布你的包到npm上，然后使用npm i来安装这一个包。当发现有bug的时候，回到包里修改这一bug。
 * 改好了以后再修改版本号，重新发布。发布了以后重新npm i来重新安装
 * 2. 也可以将测试app连接你本地的组件库包里，使用npm link，这样就不需要先发布再使用了
 */ 
