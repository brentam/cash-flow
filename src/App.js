import React from 'react';
import { Header } from './components/Header';
import { PeriodProvider } from './context/PeriodState';
import { BankStatementDrop } from './components/BankStatementDrop';
import { BankSideTable } from './components/BankSideTable';



function App() {
  return (
    < >
      <Header />
      <PeriodProvider>
        <BankStatementDrop />
        <BankSideTable/>

      </PeriodProvider>

      <div className="container">
      </div>

    </>
  );
}

export default App;