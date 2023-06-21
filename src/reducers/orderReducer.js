import {
    CREATE_USER_ORDER,
    CREATE_USER_ORDER_SUCCESS,
    CREATE_USER_ORDER_FAILURE,
    CONFIRM_USER_ORDER,
    CONFIRM_USER_ORDER_SUCCESS,
    CONFIRM_USER_ORDER_FAILURE,
    
} from '../types/index'

const initialState = {
    ticketId: '',
    order: {},
    isLoading: false,
    status:''
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER_ORDER:
            return { ...state, isLoading: action.isLoading};

        case CREATE_USER_ORDER_SUCCESS:
            return { ...state, isLoading: action.isLoading, order:action.payload.order, status: "order created"};

        case CREATE_USER_ORDER_FAILURE:
            return { ...state, isLoading: action.isLoading, status: "order rejected" };

        // case CONFIRM_USER_ORDER:
        
        case CONFIRM_USER_ORDER_SUCCESS:
            return { ...state, isLoading: action.isLoading, status: "order confirmed" };
        case CONFIRM_USER_ORDER_FAILURE:
            return { ...state, isLoading: action.isLoading, status: "order rejected" };
        default:
            return state;
    }
  };
  
  export default orderReducer;
