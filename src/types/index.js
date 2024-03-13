import {
    CLEAR_STORE,
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
    CART_CONFIRMED,

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
    IS_EVENTS_CHECKED,
    EVENTS_SAVED,
    PUT_EVENT_STATUS,
    FETCH__DUMMY_EVENTS_LIST,
    FETCH__DUMMY_EVENTS_LIST_SUCCESS,
    FETCH__DUMMY_EVENTS_LIST_FAILURE,
    FETCH__DUMMY_EVENT_DETAILS,
    FETCH__DUMMY_EVENT_DETAILS_SUCCESS,
    FETCH__DUMMY_EVENT_DETAILS_FAILURE,
    POST__DUMMY_EVENT_DETAILS,
    POST__DUMMY_EVENT_DETAILS_SUCCESS,
    POST__DUMMY_EVENT_DETAILS_FAILURE,
    PUT__DUMMY_EVENT_DETAILS,
    PUT__DUMMY_EVENT_DETAILS_SUCCESS,
    PUT__DUMMY_EVENT_DETAILS_FAILURE,
    CLEAR__DUMMY_EVENT_DETAILS,
    ADD__DUMMY_EVENT,
    REMOVE__DUMMY_EVENT,
    CLEAR__DUMMY_EVENTS,
    SAVE__DUMMY_EVENTS,
    RESET_DUMMY_EVENTS,
    IS_DUMMY_EVENT_CHECKED,
    POST__DUMMY_EVENTS,

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

    FETCH__CARTS_LIST,
    FETCH__CARTS_LIST_SUCCESS,
    FETCH__CARTS_LIST_FAILURE,
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
    UPDATE_CART_TICKET,
    ADD__TO_CART,
    CLEAR__CART,
    REMOVE__FROM_CART,
    CART_SAVED,
    RESET_EVENTS,
    DELETE__CART_DETAILS,
    EVENTS_CONFIRMED,
    DUMMY_EVENTS_CONFIRMED,
    
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
    EVENTS_ADDED_TO_CART,
    DUMMY_EVENTS_ADDED_TO_CART,
    PUT_DUMMY_EVENT_STATUS,
    CART_STATUS_CONFIRMED,
    REMOVE_DUMMY_EVENTS_FROM_CART,
    REMOVE_EVENTS_FROM_CART,
    FETCH__LOGS_LIST,
    FETCH__LOGS_LIST_FAILURE,
    FETCH__LOGS_LIST_SUCCESS,
    FETCH__MACHINE_DETAILS,
    FETCH__MACHINE_DETAILS_SUCCESS,
    FETCH__MACHINE_DETAILS_FAILURE,
    FETCH__MACHINES_LIST,
    FETCH__MACHINES_LIST_SUCCESS,
    FETCH__MACHINES_LIST_FAILURE,
}  from './action-types';

export {
    CLEAR_STORE,
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
    CART_CONFIRMED,

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
    IS_EVENTS_CHECKED,
    EVENTS_SAVED,
    PUT_EVENT_STATUS,
    FETCH__DUMMY_EVENTS_LIST,
    FETCH__DUMMY_EVENTS_LIST_SUCCESS,
    FETCH__DUMMY_EVENTS_LIST_FAILURE,
    FETCH__DUMMY_EVENT_DETAILS,
    FETCH__DUMMY_EVENT_DETAILS_SUCCESS,
    FETCH__DUMMY_EVENT_DETAILS_FAILURE,
    POST__DUMMY_EVENT_DETAILS,
    POST__DUMMY_EVENT_DETAILS_SUCCESS,
    POST__DUMMY_EVENT_DETAILS_FAILURE,
    PUT__DUMMY_EVENT_DETAILS,
    PUT__DUMMY_EVENT_DETAILS_SUCCESS,
    PUT__DUMMY_EVENT_DETAILS_FAILURE,
    CLEAR__DUMMY_EVENT_DETAILS,
    ADD__DUMMY_EVENT,
    REMOVE__DUMMY_EVENT,
    CLEAR__DUMMY_EVENTS,
    SAVE__DUMMY_EVENTS,
    RESET_DUMMY_EVENTS,
    IS_DUMMY_EVENT_CHECKED,
    POST__DUMMY_EVENTS,

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

    FETCH__CARTS_LIST,
    FETCH__CARTS_LIST_SUCCESS,
    FETCH__CARTS_LIST_FAILURE,
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
    UPDATE_CART_TICKET,
    ADD__TO_CART,
    CLEAR__CART,
    REMOVE__FROM_CART,
    CART_SAVED,
    RESET_EVENTS,
    DELETE__CART_DETAILS,
    EVENTS_CONFIRMED,
    DUMMY_EVENTS_CONFIRMED,
    
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
    EVENTS_ADDED_TO_CART,
    DUMMY_EVENTS_ADDED_TO_CART,
    PUT_DUMMY_EVENT_STATUS,
    CART_STATUS_CONFIRMED,
    REMOVE_DUMMY_EVENTS_FROM_CART,
    REMOVE_EVENTS_FROM_CART,
    FETCH__LOGS_LIST,
    FETCH__LOGS_LIST_FAILURE,
    FETCH__LOGS_LIST_SUCCESS,
    FETCH__MACHINE_DETAILS,
    FETCH__MACHINE_DETAILS_SUCCESS,
    FETCH__MACHINE_DETAILS_FAILURE,
    FETCH__MACHINES_LIST,
    FETCH__MACHINES_LIST_SUCCESS,
    FETCH__MACHINES_LIST_FAILURE,
}

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SHOW_ALERT = 'SHOW_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';
export const TOGGLE_THEME = 'TOGGLE_THEME';
