import React, { createContext,useState } from 'react'
import Data from '../data/model.json';


export const initialState= {visible:false,value:+0}

export const TableModalContext= createContext(
initialState
);

export function TableModalProvider({children}) {
    const [state,setState] = useState(initialState);

    function resetModal(){
        setState(initialState);
    }
    function showModal({visible,value}){
        
        setState({...state,visible:visible,value:value});


    }

  return (
    <TableModalContext.Provider
    value={{modalState:state,showModal,resetModal}}
    
    >
{children}
    </TableModalContext.Provider>
      
  )
}

