import React, { createContext, useReducer,useState } from 'react'
import Data from '../data/model.json';

const initialState={bankSide:[], transactionSide:[]};

export const PeriodContext=createContext();

export const PeriodProvider=({children})=>{
    const [state,setState] = useState(initialState);

    function changePeriod(period){
        setState(period);
    }
    function splitBankSideTransaction({originalId,newTransactions}){
        const bankSide=state.bankSide.slice(0);
        const index=bankSide.map(function(e) { return e.id; }).indexOf(originalId);
        bankSide.splice(index,1,...newTransactions);
        
        setState({...state,bankSide});


    }

    function splitCopy(maxTransactionId,transaction, values){

       return values.map((v)=>({...transaction,value:v,id:++maxTransactionId   }));
        
    }

    function splitCashFlowTransaction(originalTransactionId,newValues){
        const transactionSide=state.transactionSide.slice(0);
        const index=transactionSide.map(function(e) { return e.id; }).indexOf(originalTransactionId);

        const maxIndex=transactionSide.length?(transactionSide.reduce((prev,current)=>{return (prev.id>current.id)?prev:current}).id):0;
        let ttt=transactionSide[index];
        ttt= splitCopy(maxIndex,ttt,newValues);

        transactionSide.splice(index,1,...ttt);
        
        setState({...state,transactionSide: transactionSide});


    }

return (<PeriodContext.Provider
value={{period:state,changePeriod,splitBankSideTransaction,splitCashFlowTransaction}}

>{children}</PeriodContext.Provider>);
}
