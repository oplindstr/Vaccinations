import { DateContext } from "../DateContext"
import { useContext } from 'react'
import DatePicker from "react-datepicker";

export const DateSelector = () => {
  const [ state, dispatch ] = useContext(DateContext);

  return (
    <DatePicker selected={new Date(state.date)} onChange={(newDate) => dispatch({ newDate: newDate })} />
  )
}