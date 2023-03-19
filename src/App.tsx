import React, {useState, useEffect} from 'react';
import Button, {ButtonType, ButtonSize} from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/Icon';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Transition from './components/Transition/Transition';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import axios from 'axios';
import DatePicker from './components/DatePicker/DatePicker';

library.add(fas);

function App() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const postData = {
    title: 'my title',
    body: 'hello man',
  }
  useEffect(() => {
    axios.post('https://jsonplaceholder.typicode.com/posts', postData, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      responseType: 'json',
    })
      .then(resp => {
        console.log(resp)
        setTitle(resp.data.title);
      })
  }, []);

  const handleFileChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    //获取到所有用户选中的files
    if (files) {
      const uploadedFile = files[0];
      const formData = new FormData();
      formData.append(uploadedFile.name, uploadedFile);
      axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 使用multipart/form-data以便更快速的上传file
        }
      }).then((resp) => {
        console.log(resp);
      })
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon='arrow-up' theme='danger' size='10x' />
        <Menu defaultIndex='0' onSelect={(index) => alert(index)} defaultOpenSubmenus={['3']}>
          <MenuItem>
            cool link 1
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <MenuItem>
            cool link 3
          </MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>
              cool link 2
            </MenuItem>
            <MenuItem>
              cool link 3
          </MenuItem>
          </SubMenu>
        </Menu>
        <Button size='lg' onClick={() => setShow(!show)}> Toggle </Button>
        <Transition
          in={show}
          timeout={300}
          classNames='zoom-in-left'
        >
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          classNames='zoom-in-left'
          wrapper
        >
          <Button size='lg' btnType='primary'>A Large Button</Button>
          {/**
           * 因为Transition的动画类名，是作用在子元素身上的。但是因为Button本身已经有了transition属性。因此如果这么加的话两个transition会冲突，于是就不会有动画效果了
           * 解决方法是：如果子元素有transition，就在子元素外面加一个wrapper，将Transition的动画类名加在wrapper上
           * 因为父元素的transition无法被子元素继承，因此两个transition就不会冲突了
           */}
        </Transition>
        <Button autoFocus> Hello </Button>
        <Button
          disabled
        >
          Disabled Button 
        </Button>
        <Button
          btnType='primary'
          size='lg'
        >
          Large Primary 
        </Button>
        <Button
          btnType='danger'
          size='sm'
        >
          Small Danger 
        </Button>
        <Button
          btnType='link'
          size='lg'
          href='https://www.google.com.au'
          target='_blank'
        >
          Google 
        </Button>
        <Button
          btnType='link'
          size='lg'
          href='https://www.google.com.au'
          disabled
        >
          Disabled Google 
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>{title}</h1>
      </header>
      <input type='file' name='myFile' onChange={handleFileChange} />
      <DatePicker title='date picker' selectedDate={selectedDate} onSelect={setSelectedDate}/>
    </div>
  );
}

export default App;


// 测试：什么样的文件会被认为是测试文件：
// 1. __tests__文件夹中所有的.js/.ts文件
// 2. 名字叫.test.js的文件
// 3. 名字叫.spec.js的文件

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