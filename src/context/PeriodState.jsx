import React, { createContext, useReducer,useState } from 'react'
import Data from '../data/model.json';

const periodMap= new Map(Data.period.map(i=>[i.dateId,i]));
const initialState={period:{bankSide:[], transactionSide:[]}};

export const PeriodContext=createContext(initialState);

export const PeriodProvider=({children})=>{
    const [state,setState] = useState(initialState);

    function changePeriod(period){
        setState({period:period});
    }


return (<PeriodContext.Provider
value={{period:state.period,changePeriod}}

>{children}</PeriodContext.Provider>);
}
