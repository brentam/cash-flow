import React, { createContext,useState } from 'react'
import Data from '../data/model.json';


export const initialState= {visible:false,value:+0, modalTransactions:[]}

export const TableModalContext= createContext(
initialState
);

export function TableModalProvider({children}) {
    const [state,setState] = useState(initialState);

    function resetModal(){
        setState(initialState);
    }
    function showModal({visible,value}){
        const modal=[];
        modal[0]=value;
        modal[1]=value;
        setState({...state,visible:visible,value:value,modalTransactions:modal});
    }


  return (
    <TableModalContext.Provider
    value={{modalState:state,showModal,resetModal}}
    
    >
{children}
    </TableModalContext.Provider>
      
  )
}

