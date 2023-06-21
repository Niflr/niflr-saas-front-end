import { SET_MODAL_STATE } from '../types/index'

 const defaultModalState = {
    visible: false,
    modalName: 'SPINNER',
    modalHeader: 'Oops!',
    modalContent: '',
};

export default (state = defaultModalState, action) => {
    // console.log("calling modal action",action)
    switch (action.type) {
        case SET_MODAL_STATE:
            return { ...defaultModalState, ...action.payload }
        default:
            return state
    }
}