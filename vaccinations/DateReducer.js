export const reducer = (state, action) => {
    return {
      ...state,
      date: action.newDate.toLocaleDateString()
    }
  }
  
export const initialState = {
  date: "2021-04-12"
}