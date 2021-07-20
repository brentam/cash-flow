import React from 'react';
import { Header } from './components/Header';
import { PeriodProvider } from './context/PeriodState';
import { CASH_FLOW_SIDE, BANK_SIDE } from './consts.js'
import { TableModalProvider } from './context/TableModalState';
import { MatchedProvider } from './context/MatchedState';
import { BankStatementDrop } from './components/BankStatementDrop';
import { CashFlowTag } from './components/CashFlowTag';



function App() {
  return (
    < >
      <Header />
      <PeriodProvider>
        <BankStatementDrop />

        <MatchedProvider>

          <TableModalProvider>
            <CashFlowTag type={BANK_SIDE} />
          </TableModalProvider>
          <TableModalProvider>
            <CashFlowTag type={CASH_FLOW_SIDE} />
          </TableModalProvider>

        </MatchedProvider>
      </PeriodProvider>

      <div className="container">
      </div>

    </>
  );
}

export default App;