import { SET_USER } from '../types';

const initialState = {
  facultyInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        facultyInfo: action.payload,
      };
    case 'RESET_USER':
      return {
        ...state,
        facultyInfo: null,
      };
    default:
      return state;
  }
};

export default userReducer;
