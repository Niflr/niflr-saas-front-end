import {

    FETCH__USERS_LIST,
    FETCH__USERS_LIST_SUCCESS,
    // FETCH__USERS_LIST_FAILURE,
    FETCH__USER_DETAILS,
    FETCH__USER_DETAILS_SUCCESS,
    FETCH__USER_DETAILS_FAILURE,
    // POST__USER_DETAILS,
    // POST__USER_DETAILS_SUCCESS,
    // POST__USER_DETAILS_FAILURE,
    PUT__USER_DETAILS,
    PUT__USER_DETAILS_SUCCESS,
    PUT__USER_DETAILS_FAILURE,
    CLEAR__USER_DETAILS,
  } from '../types/index';
  
  const DATA = {
    user: {},
    users: {
      count: 0,
      rows: [],
    },
    isLoading: false,
    error: false,
    status: '',
  };
  
  export default (state = DATA, action) => {
    // console.log("reducer testing",action)
    switch (action.type) {
      case FETCH__USER_DETAILS_SUCCESS:
        // console.log("fetch user success")
        return { ...state, isLoading: action.isLoading, user: action.payload };
      case FETCH__USERS_LIST_SUCCESS:
        // console.log("fetch user list success",JSON.stringify(action.payload.users))
        return { ...state, isLoading: action.isLoading, users:action.payload.users };
      case PUT__USER_DETAILS_SUCCESS:
      default:
        return state;
    }
  };
  