import React from 'react';
import './App.css';
import Button, {ButtonType, ButtonSize} from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button> Hello </Button>
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
