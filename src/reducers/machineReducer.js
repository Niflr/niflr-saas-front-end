import {
    FETCH__MACHINES_LIST,
    FETCH__MACHINES_LIST_SUCCESS,
    FETCH__MACHINES_LIST_FAILURE,
    FETCH__MACHINE_DETAILS_SUCCESS
} from '../types/index'

const DATA = {
    machines: [],
    machine: {},
    isLoading: false,
    error: false,
    status: ''
};

export default (state=DATA, action) => {
    console.log("calling machine reducer", action);
    switch(action.type) {
        case FETCH__MACHINES_LIST_SUCCESS:
            console.log("fetch machines list success", action.payload)
            return { ...state, isLoading: action.isLoading, machines: action.payload.data.machines.rows, status: 'OK' };
        case FETCH__MACHINES_LIST_FAILURE:
            return { ...state, isLoading: action.isLoading, status: 'ERR' }
        case FETCH__MACHINE_DETAILS_SUCCESS:
            console.log("fetch machine details success", action.payload)
            return {...state, isLoading: action.isLoading, machine: action.payload.data.machine}
        default:
            return state;
    }
};