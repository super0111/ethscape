const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LANG':
      return {
        ...state,
        lang: action.payload
      }
    case 'SET_CartLists':
      return {
        ...state,
        cartLists: action.payload
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      }
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    case 'SET_USER_PICTURE':
      return {
        ...state,
        user: { ...state.user, picture: action.payload }
      }
    case 'SET_POST_TYPE':
      return {
        ...state,
        postType: action.payload
      }
    case 'SET_FAB_VISIBLE':
      return {
        ...state,
        fab: action.payload
      }
    case 'SET_WALLET_CONNECT_VISIBLE':
      return {
        ...state,
        walletConnect: action.payload
      }
    case 'SET_FORUM_MENU_ACTIVE':
      return {
        ...state,
        forumMenuActive: action.payload
      }    
    case 'SET_USER_WALLET':
      return {
        ...state,
        user: { ...state.user,
          address: action.payload.address,
          ethscapeBalance: action.payload.ethscapeBalance,
          totalSupplyPercentage: action.payload.totalSupplyPercentage
        }
      }
    default:
      return state
  }
}

export default Reducer;
