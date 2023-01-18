import React from 'react';
import './App.css';
import Button, {ButtonType, ButtonSize} from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button autoFocus> Hello </Button>
        <Button
          disabled
        >
          Disabled Button 
        </Button>
        <Button
          btnType={ButtonType.Primary}
          size={ButtonSize.Large}
        >
          Large Primary 
        </Button>
        <Button
          btnType={ButtonType.Danger}
          size={ButtonSize.Small}
        >
          Small Danger 
        </Button>
        <Button
          btnType={ButtonType.Link}
          size={ButtonSize.Large}
          href='https://www.google.com.au'
          target='_blank'
        >
          Google 
        </Button>
        <Button
          btnType={ButtonType.Link}
          size={ButtonSize.Large}
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