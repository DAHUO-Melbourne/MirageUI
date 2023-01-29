import React, {useState} from 'react';
import Button, {ButtonType, ButtonSize} from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/Icon';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Transition from './components/Transition/Transition';

library.add(fas);

function App() {
  const [show, setShow] = useState(false);
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
      </header>
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
 */