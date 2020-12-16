import React, { createContext, useState } from 'react'
import {CASH_FLOW_SIDE,BANK_SIDE} from '../consts.js'


export const initialState = { visible: false, value: +0, id:-1,modalTransactions: [],type:CASH_FLOW_SIDE }

export const TableModalContext = createContext(
  initialState
);

export function TableModalProvider({ children }) {
  const [state, setState] = useState(initialState);

  function resetModal() {
    setState(initialState);
  }
  function showModal({ type,visible, value,id }) {
    const modal = [];
    modal[0] = value;
    modal[1] = value;
    setState({ ...state, visible: visible, value: value, id:id,modalTransactions: modal ,type:type });
  }

  function handleChangeValues(value, index) {
    let arr = [...state.modalTransactions]
    arr[index] = value;
    setState({ ...state, modalTransactions: arr })
    // setAmount(arr);
  }
  function deleteModal(index) {

     let arr = [...state.modalTransactions];
     arr.splice(index,1);
    setState({ ...state, modalTransactions: arr })
  }


  function createNewModalTransaction(value){
     const clonedArray = [...state.modalTransactions];
     clonedArray.push(value);
     setState({...state, modalTransactions:clonedArray});
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <TableModalContext.Provider
      value={{ modalState: state, showModal, resetModal, handleChangeValues,createNewModalTransaction,deleteModal }}

    >
      {children}
    </TableModalContext.Provider>

  )
}

