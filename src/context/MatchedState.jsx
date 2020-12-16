import React, { createContext, useState } from 'react'
import { NONE, CREDIT, DEBIT } from '../consts.js'


export const initialState = { focus: NONE };

export const MatchedContext = createContext(
  initialState
);

export function MatchedProvider({ children }) {
  const [state, setState] = useState(initialState);

  function changeFocus(newFocus) {

    setState({ ...state, focus: newFocus });

  }

  function clearFocus() {
    changeFocus(NONE);
  }

  function changeFocusPerValue(value) {
    changeFocus(value >= 0 ? CREDIT : DEBIT);
  }

  function isValueInFocus(value) {
    if (state.focus === NONE) {
      return true;
    }
    return state.focus === (value >= 0 ? CREDIT : DEBIT);
  }
  return (
    <MatchedContext.Provider
      value={{ matchState: state, isValueInFocus, clearFocus, changeFocusPerValue }}

    >
      {children}
    </MatchedContext.Provider>

  )
}

