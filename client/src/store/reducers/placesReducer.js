import {
  ADD_PLACE_FAILURE,
  ADD_PLACE_SUCCESS,
  FETCH_PLACE_SUCCESS,
  FETCH_PLACES_SUCCESS, UPDATE_PLACE_SUCCESS, UPDATE_PLACE_FAILURE
} from "../actions/placesActions";

const initialState = {
  places: [],
  place: null,
  placeId: null,
  loading: false,
  error: null,
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES_SUCCESS:
      return {...state, places: action.places};
    case ADD_PLACE_SUCCESS:
      return {...state, loading: false};
    case ADD_PLACE_FAILURE:
      return {...state, error: action.error};
    case FETCH_PLACE_SUCCESS:
      return {...state, place: action.place};
    case UPDATE_PLACE_SUCCESS:
      return {...state, placeId: action.placeId, loading: false};
    case UPDATE_PLACE_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default placesReducer;