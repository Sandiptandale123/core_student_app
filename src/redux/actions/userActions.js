import { SET_USER, SET_LOADING } from '../types';

// Async Action using Thunk
export const fetchUser = () => {
  return async dispatch => {
    dispatch({ type: SET_LOADING, payload: true });

    try {
      // Simulate API call
      const response = await new Promise(resolve =>
        setTimeout(() => resolve({ name: 'Sandip', age: 25 }), 2000)
      );

      dispatch({ type: SET_USER, payload: response });
    } catch (error) {
      console.error('Fetch user failed:', error);
    }

    dispatch({ type: SET_LOADING, payload: false });
  };
};
