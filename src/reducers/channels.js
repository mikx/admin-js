import Store from '../store/channels';

export const initialState = Store;

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {

    case 'CHANNELS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }

    case 'CHANNELS_REPLACE': {

      let channels = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        channels = action.data.map(item => ({
          id: item.id,
          name: item.name,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        channels,
      };
    }

    default:
      return state;
  }

}
