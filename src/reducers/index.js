import { combineReducers } from 'redux';
import authReducer from './authReducer';
import eventReducer from './eventReducer';
import ticketReducers from './ticketReducers';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import videoReducers from './videoReducers';
import modalReducer from './modalReducer';
import dummyEventReducer from './dummyEventReducer';
import variantReducers from './variantReducers';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	user:userReducer,
	ticket: ticketReducers,
	event:eventReducer,
	cart: cartReducer,
	video: videoReducers,
	modal: modalReducer,
	dummyEvent: dummyEventReducer,
	product:variantReducers,
	order:orderReducer
});
export default rootReducer;
