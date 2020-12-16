import React from 'react'
import '../theApp.css';
import Money from './Money'

function CashFlowSummary({ totals }) {
  return (
    // <div id="money-plus" class="money plus">0.00</div>
    <div className="inc-exp-container">
      <div>
        <h4>Credits</h4>
        <Money value={totals.totalCredit} />
      </div>
      <div>
        <h4>Debits</h4>
        <Money value={totals.totalDebit} />
      </div>
    </div>
  )
}
export default CashFlowSummary

