import React, { createContext, useReducer,useState } from 'react'
import {CASH_FLOW_SIDE,BANK_SIDE} from '../consts.js'

const initialState={bankSide:[], transactionSide:[]};

export const PeriodContext=createContext();

export const PeriodProvider=({children})=>{
    const [state,setState] = useState(initialState);

    function changePeriod(period){
        setState(period);
    }


    function splitTransaction(originalId,newValues,arrayName){
        // const arr=state[arrayName].slice(0);
        // const index=arr.map(function(e) { return e.id; }).indexOf(originalId);
        // arr.splice(index,1,...newTransactions);
        // let newState={...state};
        // newState[arrayName]=arr;
        // setState(newState);

        const arr=state[arrayName].slice(0);
        const index=arr.map(function(e) { return e.id; }).indexOf(originalId);

        //todo find another way to generate new indexes..
        const maxIndex=arr.length?(arr.reduce((prev,current)=>{return (prev.id>current.id)?prev:current}).id):0;
        let value=arr[index];
        value= splitCopy(maxIndex,value,newValues);

        arr.splice(index,1,...value);
        let newState={...state};
        newState[arrayName]=arr;
        setState(newState);

    }
    function splitBankSideTransaction(originalId,newTransactions){
        splitTransaction(originalId,newTransactions,"bankSide");
    }

    function splitCopy(maxTransactionId,transaction, values){

       return values.map((v)=>({...transaction,value:v,id:++maxTransactionId   }));
        
    }

    function splitCashFlowTransaction(originalId,newTransactions){
        // const transactionSide=state.transactionSide.slice(0);
        // const index=transactionSide.map(function(e) { return e.id; }).indexOf(originalTransactionId);

        // //todo find another way to generate new indexes..
        // const maxIndex=transactionSide.length?(transactionSide.reduce((prev,current)=>{return (prev.id>current.id)?prev:current}).id):0;
        // let ttt=transactionSide[index];
        // ttt= splitCopy(maxIndex,ttt,newValues);

        // transactionSide.splice(index,1,...ttt);
        
        // setState({...state,transactionSide: transactionSide});

        splitTransaction(originalId,newTransactions,"transactionSide");

    }
    function split(type,originalId,newTransactions){
        const collectionName=(type===BANK_SIDE?"bankSide":"transactionSide")
        splitTransaction(originalId,newTransactions,collectionName);

    }

return (<PeriodContext.Provider
value={{period:state,changePeriod,split}}

>{children}</PeriodContext.Provider>);
}
