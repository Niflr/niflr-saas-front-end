import {
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
  RESET_EVENTS,
  EVENTS_CONFIRMED,
  EVENTS_ADDED_TO_CART,
} from '../types/index';

const DATA = {
  event: {},
  events: {},
  isLoading: false,
  error: false,
  status: '',
  count: 0,
};

export default (state = DATA, action) => {
  // console.log("reducer testing",action)
  switch (action.type) {
    case FETCH__EVENT_DETAILS_SUCCESS:
      // console.log("fetch event success")
      return { ...state, isLoading: action.isLoading, event: action.payload };
    case FETCH__EVENTS_LIST_SUCCESS:
      // console.log("fetch event list success",action.payload)
      return { ...state, isLoading: action.isLoading, events: action.payload };
    case EVENTS_SAVED: {
      const updatedEvents = state.events.events.map((event) => {
        if (event.status === 'ADDED_TO_CART') {
          return { ...event, status: 'CONFIRMED' };
        }
        return event;
      });
      return {
        ...state,
        events: { ...state.events, events: updatedEvents },
      };
    }
    case EVENTS_ADDED_TO_CART: {
      const updatedEvents = state.events.events.map((event) => {
        if (event.status === 'checked') {
          return { ...event, status: 'ADDED_TO_CART' };
        }
        return event;
      });
      return {
        ...state,
        events: { ...state.events, events: updatedEvents },
      };
    }

    case EVENTS_CONFIRMED: {
      const updatedEvents = state.events.events.map((event) => {
        if (event.status === 'saved') {
          return { ...event, status: 'confirmed' };
        }
        return event;
      });
      return {
        ...state,
        events: { ...state.events, events: updatedEvents },
      };
    }
    case IS_EVENTS_CHECKED: {
      const updatedEvents = state.events.events.map((event) => {
        if (event.id === action.payload) {
          if (event.status === 'checked') {
            return { ...event, status: 'unchecked' };
          }
          return { ...event, status: 'checked' };
        }
        return event;
      });
      return {
        ...state,
        events: { ...state.events, events: updatedEvents },
      };
    }
    case RESET_EVENTS: {
      const updatedEvents = state.events.events.map((event) => {
        if (event.status === 'ADDED_TO_CART') {
          return { ...event, status: 'checked' };
        }
        return event;
      });
      return {
        ...state,
        events: { ...state.events, events: updatedEvents },
      };
    }
    default:
      return state;
  }
};
