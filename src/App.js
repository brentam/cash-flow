import React from 'react';
import { Header } from './components/Header';
import { PeriodProvider } from './context/PeriodState';
import { TableModalProvider } from './context/TableModalState';
import { BankStatementDrop } from './components/BankStatementDrop';
import { BankSideTag } from './components/BankSideTag';
import { CashFlowTag } from './components/CashFlowTag';



function App() {
  return (
    < >
      <Header />
      <PeriodProvider>
        <BankStatementDrop />

        <TableModalProvider>

          {/* <BankSideTag /> */}
          <CashFlowTag/>
        </TableModalProvider>

      </PeriodProvider>

      <div className="container">
      </div>

    </>
  );
}

export default App;