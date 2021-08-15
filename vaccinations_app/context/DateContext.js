import React from "react"
import { reducer, initialState } from "./DateReducer"

export const DateContext = React.createContext({
  state: initialState,
  dispatch: () => null
})

export const DateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <DateContext.Provider value={[ state, dispatch ]}>
    	{ children }
    </DateContext.Provider>
  )
}