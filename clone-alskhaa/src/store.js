import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarShow: !state.sidebarShow }
    case 'TOGGLE_UNFOLDABLE':
      return { ...state, sidebarUnfoldable: !state.sidebarUnfoldable }
    default:
      return state
  }
}

const store = createStore(reducer)
export default store