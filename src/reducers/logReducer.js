import {
    FETCH__LOGS_LIST,
    FETCH__LOGS_LIST_SUCCESS,
    FETCH__LOGS_LIST_FAILURE
} from '../types/index'

const DATA = {
    logs: [],
    isLoading: false,
    error: false,
    status: ''
};

export default (state=DATA, action) => {
    switch(action.type) {
        case FETCH__LOGS_LIST_SUCCESS:
            return { ...state, isLoading: action.isLoading, logs: action.payload.logs, status: 'OK' };
        case FETCH__LOGS_LIST_FAILURE:
            return { ...state, isLoading: action.isLoading, status: 'ERR' }
        default:
            return state;
    }
};