import {

    FETCH__TICKETS_LIST,
    FETCH__TICKETS_LIST_SUCCESS,
    FETCH__TICKETS_LIST_FAILURE,
    FETCH__TICKET_DETAILS,
    FETCH__TICKET_DETAILS_SUCCESS,
    FETCH__TICKET_DETAILS_FAILURE,
    POST__TICKET_DETAILS,
    POST__TICKET_DETAILS_SUCCESS,
    POST__TICKET_DETAILS_FAILURE,
    PUT__TICKET_DETAILS,
    PUT__TICKET_DETAILS_SUCCESS,
    PUT__TICKET_DETAILS_FAILURE,
    CLEAR__TICKET_DETAILS,
    SELECT_TICKET_DETAILS,
    TICKET_CONFIRMED,
    CREATE_USER_ORDER_SUCCESS
  
  } from '../types/index';
  
  const DATA = {
    ticket: {},
    tickets: {},
    isLoading: false,
    error: false,
    status: '',
  };
  
  export default (state = DATA, action) => {
    // console.log("reducer testing",action)
    switch (action.type) {
      case FETCH__TICKET_DETAILS_SUCCESS:
        // console.log("fetch ticket success")
        return { ...state, isLoading: action.isLoading, ticket: action.payload.ticket };
      case FETCH__TICKETS_LIST_SUCCESS:
        // console.log("fetch ticket list success",action.payload.tickets)
        return { ...state, isLoading: action.isLoading, tickets:action.payload.tickets };
      case PUT__TICKET_DETAILS_SUCCESS:
      case SELECT_TICKET_DETAILS:
        // console.log("fetching ticket list success",action.payload)
        return { ...state, isLoading: action.isLoading, ticket:action.payload };
      case TICKET_CONFIRMED:
        // console.log("checking if ticket is saved",action.payload)  
        return { ...state, 
          ticket: { ...state.ticket, status: "confirmed" },
        }
      case CREATE_USER_ORDER_SUCCESS:
          return { ...state, 
            ticket: { ...state.ticket,
              order_id:action.payload.order.id,
            order_status: "ORDER_CREATED",
            // resolved_by
          }
          };

      default:
        return state;
    }
  };
  