import {
    ADD__TO_CART,
    REMOVE__FROM_CART,
    CLEAR__CART,
    CART_SAVED,
    UPDATE_CART_TICKET,
    FETCH__CART_DETAILS,
    POST__CART_DETAILS,
    POST__CART_DETAILS_SUCCESS,
    POST__CART_DETAILS_FAILURE,
    FETCH__CART_DETAILS_SUCCESS,
    CART_CONFIRMED,
    
} from '../types/index'

const initialState = {
    ticketId: '',
    cartItems:null,
    status:'',
    count:0
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH__CART_DETAILS_SUCCESS:
                  // console.log("fetch event list success",action.payload)
                  return { ...state, isLoading: action.isLoading, cartItems:action.payload.cartItems };
      case UPDATE_CART_TICKET:
      return {
        ...state,
        ticketId:action.payload
      }
      // case FETCHED_CART:
      //   return { ...state, cartItems: action.payload };
      case ADD__TO_CART:
        {
          // console.log("checking cart payloads", JSON.stringify(action.payload) )
        // const { SKU, Quantity, TicketId, Status } = action.payload;
        const updatedCartItems = [...state.cartItems, action.payload];
        return { ...state, cartItems: updatedCartItems, count:updatedCartItems.length};}
      case REMOVE__FROM_CART:
        {
          
          const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
        const newCartItems = [...state.cartItems];
        newCartItems.splice(index, 1);
        return { ...state, cartItems: newCartItems };
      
      }
      case  CLEAR__CART:
        // console.log("inside clear cart")
        return { ...state, cartItems: [], status: "processing", count:0};
  
      case CART_SAVED:
        {
        const updatedItems = state.cartItems.map((item) => ({ ...item, status: 'saved' }));
        return { ...state, cartItems: updatedItems };
      }
      case CART_CONFIRMED:
        console.log("inside cart confirmed")
        {
          const updatedItems = state.cartItems.map((item) => ({ ...item, status: 'confirmed' }));
        return { ...state, cartItems: updatedItems };
    }
      default:
        return state;
    }
  };
  
  export default cartReducer;