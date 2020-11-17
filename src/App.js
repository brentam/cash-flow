import React from 'react';
import {Header} from './components/Header';
import {GlobalProvider} from './context/GlobalState';
import {BankStatementDrop} from './components/BankStatementDrop';



function App() {
  return ( 
    <GlobalProvider >
      <Header/>
<BankStatementDrop/>

        <div className="container">
        </div>

    </GlobalProvider>
  );
}

export default App;
