import store from '../store/user';

export const initialState = store;

export default function userReducer(state = initialState, action) { switch (action.type) {

    case 'USER_SESSION': {
      if (action.data && action.data.uid) {
        return {
          ...state,
          loading: false,
          error: null,
          uid: action.data.uid || action.data.uuid,
          name: action.data.name,
        };
      }
      return initialState;
    }

    case 'USER_LOGIN': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          uid: action.data.meta.uid,
          name: 'Cap. Nemo',
        };
      }
      return initialState;
    }

    case 'USER_DETAILS_UPDATE': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          signedUp: action.data.signedUp,
          role: action.data.role,
        };
      }
      return initialState;
    }

    case 'USER_ERROR': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }

    case 'USER_LOGOUT': {
      return initialState;
    }

    default:
      return state;
  }
}
