import {
    CLEAR_STORE  ,
    SET_USER_DETAILS,
    SET_MODAL_STATE,
    SET_INTERNET_STATUS,
    IS_LOADING,
    LOADING_COMPLETED,


    FETCH__USERS_LIST,
    FETCH__USERS_LIST_SUCCESS,
    FETCH__USERS_LIST_FAILURE,
    FETCH__USER_DETAILS,
    FETCH__USER_DETAILS_SUCCESS,
    FETCH__USER_DETAILS_FAILURE,
    POST__USER_DETAILS,
    POST__USER_DETAILS_SUCCESS,
    POST__USER_DETAILS_FAILURE,
    PUT__USER_DETAILS,
    PUT__USER_DETAILS_SUCCESS,
    PUT__USER_DETAILS_FAILURE,
    CLEAR__USER_DETAILS,

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
    PUT_TICKET_STATUS,

    FETCH__EVENTS_LIST,
    FETCH__EVENTS_LIST_SUCCESS,
    FETCH__EVENTS_LIST_FAILURE,
    FETCH__EVENT_DETAILS,
    FETCH__EVENT_DETAILS_SUCCESS,
    FETCH__EVENT_DETAILS_FAILURE,
    POST__EVENT_DETAILS,
    POST__EVENT_DETAILS_SUCCESS,
    POST__EVENT_DETAILS_FAILURE,
    PUT__EVENT_DETAILS,
    PUT__EVENT_DETAILS_SUCCESS,
    PUT__EVENT_DETAILS_FAILURE,
    CLEAR__EVENT_DETAILS,
    EVENTS_SAVED,
    IS_EVENTS_CHECKED,
    EVENTS_CONFIRMED,

    FETCH__VIDEOS_LIST, 
    FETCH__VIDEOS_LIST_SUCCESS, 
    FETCH__VIDEOS_LIST_FAILURE,
    FETCH__VIDEO_DETAILS, 
    FETCH__VIDEO_DETAILS_SUCCESS, 
    FETCH__VIDEO_DETAILS_FAILURE, 
    POST__VIDEO_DETAILS, 
    POST__VIDEO_DETAILS_SUCCESS, 
    POST__VIDEO_DETAILS_FAILURE, 
    PUT__VIDEO_DETAILS, 
    PUT__VIDEO_DETAILS_SUCCESS, 
    PUT__VIDEO_DETAILS_FAILURE, 
    CLEAR__VIDEO_DETAILS,

    FETCH__CART_DETAILS,
    FETCH__CART_DETAILS_SUCCESS,
    FETCH__CART_DETAILS_FAILURE,    
    POST__CART_DETAILS,
    POST__CART_DETAILS_SUCCESS,
    POST__CART_DETAILS_FAILURE,
    PUT__CART_DETAILS,
    PUT__CART_DETAILS_SUCCESS,
    PUT__CART_DETAILS_FAILURE,
    CLEAR__CART_DETAILS,
    ADD__TO_CART,
    CLEAR__CART,
    REMOVE__FROM_CART,
    CART_SAVED,
    UPDATE_CART_TICKET,
    DELETE__CART_DETAILS,
    CART_CONFIRMED,

    ADD__DUMMY_EVENT,
    REMOVE__DUMMY_EVENT,
    CLEAR__DUMMY_EVENTS,
    RESET_EVENTS,
    PUT_EVENT_STATUS,
    RESET_DUMMY_EVENTS,
    IS_DUMMY_EVENT_CHECKED,
    SAVE__DUMMY_EVENTS,
    DUMMY_EVENTS_CONFIRMED,
    POST__DUMMY_EVENTS,

    FETCH__PRODUCTS_LIST,
    FETCH__PRODUCTS_LIST_SUCCESS,
    FETCH__PRODUCTS_LIST_FAILURE,
    ADD__PRODUCT,
    RESET__PRODUCT,
    CREATE_USER_ORDER,
    CREATE_USER_ORDER_SUCCESS,
    CREATE_USER_ORDER_FAILURE,
    CONFIRM_USER_ORDER,
    CONFIRM_USER_ORDER_SUCCESS,
    CONFIRM_USER_ORDER_FAILURE,
    EVENTS_ADDED_TO_CART

} from '../types/index'

import RequestService from '../services/RequestService';


const requestService = new RequestService();
const fetchList = ({
    url,
    domain,
    action,
    params,
    search,
    data
  }) => async dispatch => {
    dispatch({
      type: action,
      isFetching: search ? LOADING_COMPLETED : IS_LOADING,
      isLoading: search || false
    });
    
    //  const res= {"users":users}
    console.log("testing fetch call params", url,domain,data)
    
    const res = await requestService.get({ url, params, domain,data });
    console.log("testing fetch call", res)
    if (res) {
        console.log("calling fetch success reducer",action)
      dispatch({
        type: `${action}_SUCCESS`,
        payload: res,
        isFetching: LOADING_COMPLETED,
        isLoading: false
      });
    } else {
      dispatch({
        type: `${action}_FAILURE`,
        error: res.error,
        isFetching: LOADING_COMPLETED,
        isLoading: false
      });
    }
  };
  
  const postData = ({ url, data, domain, action }) => async dispatch => {
    dispatch({
      type: action,
      isLoading: true
    });
    console.log("testing post call params", url,domain,data)
     const res = await requestService.post({ url, data, domain });
    console.log("testing post call", res)
    if (res.success) {
      dispatch({
        type: `${action}_SUCCESS`,
        payload: res,
        isLoading: false
      });
    } else {
      dispatch({
        type: `${action}_FAILURE`,
        error: res.error,
        isLoading: false
      });
    }
  };
  
  const putData = ({ url, domain, data, action }) => async dispatch => {
    dispatch({
      type: action,
      isLoading: true
    });
    console.log("put request details", url, domain, data, action)
    const res = await requestService.put({ url, data, domain });

    if (res.success) {
     
      dispatch({
        type: `${action}_SUCCESS`,
        payload: res,
        isLoading: false
      });
    } else {
      dispatch({
        type: `${action}_FAILURE`,
        error: res.error,
        isLoading: false
      });
    }
  };
  export const eventChecked =(eventId)=>{
    console.log("event updated", eventId)
    return {
      type: IS_EVENTS_CHECKED,
      payload: eventId
    }
  };

  export const addProduct =(product)=>{
    console.log("product added", product)
    return {
      type: ADD__PRODUCT,
      payload: product
  }
}

export const resetProduct =()=>{
  console.log("product reset")
  return {
    type: RESET__PRODUCT,

  }
}
  export const dummyEventChecked =(eventId)=>{
    console.log("dummy event updated", eventId)
    return {
      type: IS_DUMMY_EVENT_CHECKED,
      payload: eventId
    }
  };

  export const eventsSaved =()=>{
    console.log("events saved")
    return {
      type: EVENTS_SAVED,
    }
  };
  export const dummyEventsSaved =()=>{
    console.log("dummy events saved")
    return {
      type: SAVE__DUMMY_EVENTS,
    }
  };
  
  export const ticketConfirmed =()=>{
    console.log("ticket saved")
    return {
      type: TICKET_CONFIRMED,
    }
  };

  export const deleteData = ({ url, action, domain }) => async dispatch => {
    dispatch({
      type: action,
      isLoading: true
    });
    //  const res = await requestService.delete({ url, domain });
    const res={}
    if (res.success) {
      dispatch({
        type: `${action}_SUCCESS`,
        payload: res,
        isLoading: false
      });
    } else {
      dispatch({
        type: `${action}_FAILURE`,
        error: res.error,
        isLoading: false
      });
    }
  };

export const updateTicketStatus = (ticketId, data) =>
  putData({
    url: `tickets/${ticketId}`,
    data,
    action: PUT_TICKET_STATUS,
    domain: "CLOUD"
  });

  export const updateEventStatus = (data) =>
  putData({
    url: `events/UpdateStatus`,
    data ,
    action: PUT_EVENT_STATUS,
    domain: "CLOUD"
  });
  export const updateCartItemStatus = (ticketId,data) =>
  putData({
    url: `cartItems/UpdateStatus/${ticketId}`,
    data ,
    action: CART_CONFIRMED,
    domain: "CLOUD"
  });

  export const createCart = (ticketId, data) =>
  postData({
    url: `cartItems/${ticketId}`,
    data,
    action: POST__CART_DETAILS,
    domain: "CLOUD"
  });

  export const createDummyEvents = (ticketId,data) =>
  postData({
   url: `dummyEvents/${ticketId}`, 
   data,
   action: POST__DUMMY_EVENTS,
   domain: "CLOUD"
  })

  export const deleteCartItems = (ticketId) =>
  putData({
    url: `cartItems/delete/${ticketId}`,
    data:{"TicketId":ticketId},
    action: DELETE__CART_DETAILS,
    domain: "CLOUD"
  });
 //  feth ticket list
  export const fetchTicketList =params=>
  fetchList({
    url:"tickets",
    params,
    action: FETCH__TICKETS_LIST,
    domain: 'CLOUD'
  })

  export const fetchCartList =params=>
  fetchList({
    url:"cartItems/",
    params,
    action: FETCH__CART_DETAILS,
    domain: 'CLOUD'
  })

 //  fetch event list
 export const fetchEventList =(params)=>
 fetchList({
   url:"events/",
   action: FETCH__EVENTS_LIST,
   domain: 'CLOUD',
   data: params
 })

 //  fetch  videos
 export const fetchVideoList =params=>
    fetchList({
    url:"videos/",
    data: params,
    action: FETCH__VIDEOS_LIST,
    domain: 'CLOUD'
  })

 // create local cart
  export const addToCart =(items) =>{
    console.log("add to cart items", items)
    return {
        type: ADD__TO_CART,
        payload: items || []
    }
  };

   // remove from cart
  export const removeFromCart =(item)=>{
    console.log("remove cart items", item)
    return {
        type: REMOVE__FROM_CART,
        payload: item
    }
  };
  export const eventAddToCart =()=>{
    console.log("add event to cart")
    return {
        type: EVENTS_ADDED_TO_CART,
    }
  };
  

 // reset cart
  export const cartCleared =()=>{
    console.log("cart cleared")
    return {
      type: CLEAR__CART,
      payload: "cleared"

    }
  };

  // create order
  export const createUserOrder = (userId,data) =>
// change url to:  url: `user_details/${userId}/order`, 
  postData({
   url: `user_details/${userId}/orders`, 
   data,
   action: CREATE_USER_ORDER,
   domain: "ADMIN"
  });


  // confirm order
  export const confirmUserOrder = (userId,OrderId,data) =>
  // change url to:  url: url: `user_details/${userId}/order/${OrderId}`,, 
  putData({
    url: `user_details/${userId}/orders/${OrderId}`,
    data,
    action: CONFIRM_USER_ORDER,
    domain: "ADMIN"
  });

  export const resetEvents =()=>{
    console.log("cart cleared")
    return {
      type: RESET_EVENTS,
    }
  };

  export const confirmEvents =()=>{
    console.log("events confirmed")
    return {
      type: EVENTS_CONFIRMED,
    }
  };

  export const confirmDummyEvents =()=>{
    console.log("dummy events confirmed")
    return {
      type: DUMMY_EVENTS_CONFIRMED,
    }
  };


export const resetDummyEvents =()=>{
    console.log("cart cleared, dummy events")
    return {
      type: RESET_DUMMY_EVENTS,
    }
  };

 // create dummy Event
 export const addDummyEvent =(items) =>{
  console.log("add dummy events", items)
  return {
      type: ADD__DUMMY_EVENT,
      payload: items || []
  }
};


 // remove dummy event
export const removeDummyEvent =(item)=>{
  console.log("remove dummy events", item)
  return {
      type: REMOVE__DUMMY_EVENT,
      payload: item
  }
};

// reset dummy event
export const clearDummyEvents =()=>{
  console.log("dummy event cleared")
  return {
    type: CLEAR__DUMMY_EVENTS,
    payload: "cleared"

  }
};

export const updateCartTicket =(ticketId)=>{
  console.log("cart ticket updated")
  return {
    type: UPDATE_CART_TICKET,
    payload: ticketId

  }
};

export const setModalState = payload => ({
    type: SET_MODAL_STATE,
    payload,
});

  export const selectTicket =(item)=>{
    console.log("ticket updated")
    return {
      type: SELECT_TICKET_DETAILS,
      payload: item

    }
  }
  export const cartSaved =()=>{
    // console.log("checking is saved", data)
    return {
      type: CART_SAVED,
      payload: "saved"

    }
  }

  export const cartconfirmed =()=>{

    return {
      type: CART_CONFIRMED,
      payload: "confirmed"

    }
  }



  export const fetchUserList =params=>
  fetchList({
    url:"users/list",
    params,
    action: FETCH__USERS_LIST,
    domain: 'CLOUD'
  })

  export const fetchStoreProductsList =params=>
  postData({
    url:"snapshots/location/start",
    data: params,
    action: FETCH__PRODUCTS_LIST,
    domain: 'LOCAL'
  })

//  fetch request:
  //  fetch cartitems by ticket id
  


  //  update requests:

  // update ticket status
  // update event status
  // post cart items to cart items table :submit cart
  // update cart item status


  // delete request:
  // delete from cartitems from ticket id: transaction
  

  // reset actions:
  

  // reset tickets 
  // reset ticket
 
  // reset events

  

  //  fetch actions:
  // fetch local cart

  // add actions:
 

  // delete actions:




