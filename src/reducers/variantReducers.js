import {

    
    
    // RESET_PRODUCTS,
    // EVENTS_CONFIRMED

    FETCH__PRODUCTS_LIST ,
FETCH__PRODUCTS_LIST_SUCCESS ,
 FETCH__PRODUCTS_LIST_FAILURE,
 ADD__PRODUCT, 
 RESET__PRODUCT
  } from '../types/index';
  
  const DATA = {
    product: {},
    products: {
    },
    isLoading: false,
    error: false,
    status: '',
  };
  
  export default (state = DATA, action) => {
    console.log("product reducer testing",action)
    switch (action.type) {
        
            case FETCH__PRODUCTS_LIST_SUCCESS:
                  console.log("fetch product list success",action.payload)
                  return { ...state, isLoading: action.isLoading, products:action.payload };
            case ADD__PRODUCT:
                console.log("add product",action.payload)
                return { ...state, isLoading: action.isLoading, product:action.payload };
            case RESET__PRODUCT:
                console.log("reset product")
                return { ...state, isLoading: action.isLoading, product:{}};
            
          default:
              return state;
              
    }
  };
  