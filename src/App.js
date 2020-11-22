import React from 'react';
import { Header } from './components/Header';
import { GlobalProvider } from './context/GlobalState';
import { PeriodProvider } from './context/PeriodState';
import { BankStatementDrop } from './components/BankStatementDrop';
import { BankSideTable } from './components/BankSideTable';
import { Demo } from './components/Demo';



function App() {
  return (
    <GlobalProvider >
      <Header />
      <PeriodProvider>
        <BankStatementDrop />
        <Demo />
        <BankSideTable/>

      </PeriodProvider>

      <div className="container">
      </div>

    </GlobalProvider>
  );
}

export default App;
