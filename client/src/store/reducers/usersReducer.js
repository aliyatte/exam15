import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../actions/usersActions";

const initialState = {
  user: null,
  error: null,
  loading: false
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {...state, loading: true};
    case REGISTER_USER_SUCCESS:
      return {...state, loading: false, error: null};
    case REGISTER_USER_FAILURE:
      return {...state, error: action.error, loading: false};
    case LOGIN_USER_REQUEST:
      return {...state, loading: true};
    case LOGIN_USER_SUCCESS:
      return {...state, loading: false, error: null, user: action.user};
    case LOGIN_USER_FAILURE:
      return {...state, loading: false, error: action.error};
    case LOGOUT_USER_SUCCESS:
      return {...state, user: null};
    default:
      return state;
  }
};

export default usersReducer;