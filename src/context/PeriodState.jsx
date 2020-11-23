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


return (<PeriodContext.Provider
value={{period:state,changePeriod,splitBankSideTransaction}}

>{children}</PeriodContext.Provider>);
}
