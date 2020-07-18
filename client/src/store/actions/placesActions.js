import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';
import {toast} from 'react-toastify';

export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const ADD_PLACE_SUCCESS = 'ADD_PLACE_SUCCESS';
export const ADD_PLACE_FAILURE = 'ADD_PLACE_FAILURE';
export const FETCH_PLACE_SUCCESS = 'FETCH_PLACE_SUCCESS';
export const UPDATE_PLACE_SUCCESS = 'UPDATE_PLACE_SUCCESS';
export const UPDATE_PLACE_FAILURE = 'UPDATE_PLACE_FAILURE';

export const fetchPlacesSuccess = places => ({type: FETCH_PLACES_SUCCESS, places});
export const addPlaceSuccess = () => ({type: ADD_PLACE_SUCCESS});
export const addPlaceFailure = error => ({type: ADD_PLACE_FAILURE, error});
export const fetchPlaceSuccess = place => ({type: FETCH_PLACE_SUCCESS, place});
export const updatePlaceSuccess = placeData => ({type: UPDATE_PLACE_SUCCESS, placeData});
export const updatePlaceFailure = error => ({type: updatePlaceFailure, error});

export const fetchPlaces = () => {
  return async (dispatch) => {
    const response = await axiosApi.get('/places');
    dispatch(fetchPlacesSuccess(response.data));
  }
};

export const addPlace = placeData => {
  return async (dispatch) => {
    try {
      await axiosApi.post('/places', placeData);
      dispatch(addPlaceSuccess());
      dispatch(push('/'));
      toast.success('Added successfully');
    } catch (e) {
      if (e.response) {
        dispatch(addPlaceFailure(e.response.data));
      } else {
        dispatch(addPlaceFailure({ global: "Network error or no internet" }));
      }
    }
  }
};

export const fetchPlace = placeId => {
  return async dispatch => {
    const response = await axiosApi.get(`/places/${placeId}`);
    dispatch(fetchPlaceSuccess(response.data));
  }
};

export const deletePlace = placeId => {
  return async dispatch => {
    try {
      await axiosApi.delete(`/places/${placeId}`);
      dispatch(fetchPlaces());
      dispatch(push('/'))
    } catch (e) {
      console.log(e)
    }
  };
};

export const updatePlace = (placeData, placeId) => {
  return async (dispatch) => {
    try {
      const response = await axiosApi.patch(`/places/${placeId}`, placeData);
      dispatch(updatePlaceSuccess(response.data));
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
        dispatch(updatePlaceFailure(error.response.data));
      } else {
        dispatch(updatePlaceFailure({error: 'Network Error or no internet'}));
      }
    }
  }
};