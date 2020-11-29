import React, { createContext, useState } from 'react'
import Data from '../data/model.json';


export const initialState = { visible: false, value: +0, id:-1,modalTransactions: [] }

export const TableModalContext = createContext(
  initialState
);

export function TableModalProvider({ children }) {
  const [state, setState] = useState(initialState);

  function resetModal() {
    setState(initialState);
  }
  function showModal({ visible, value,id }) {
    const modal = [];
    modal[0] = value;
    modal[1] = value;
    setState({ ...state, visible: visible, value: value, id:id,modalTransactions: modal });
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

