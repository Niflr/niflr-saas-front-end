import {
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
} from '../types/index';

const DATA = {
    video: {},
    videos: {
    },
    isLoading: false,
    error: false,
    status: null,
    count: 0
  };

  
  export default (state = DATA, action) => {
    // console.log("reducer testing",action)
    switch (action.type) {
      case FETCH__VIDEO_DETAILS_SUCCESS:
      //  console.log("fetch video success")
        return { ...state, isLoading: action.isLoading, video: action.payload.video };
      case FETCH__VIDEOS_LIST_SUCCESS:
        // console.log("fetch video list count",action.payload.length)
        return { ...state, isLoading: action.isLoading, videos:action.payload , status: "fetched", count: action.payload.videos.length};
      case PUT__VIDEO_DETAILS_SUCCESS:
      default:
        return state;
    }
  };