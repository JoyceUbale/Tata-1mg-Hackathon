import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Catalyst-style reducers
const initialCatalystState = {
  theme: 'light',
  loading: false,
  error: null,
  version: '1.0.0'
};

function catalystReducer(state = initialCatalystState, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// Combine all reducers here
const rootReducer = combineReducers({
  catalyst: catalystReducer
});

// Create store with middleware as per Catalyst patterns
export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
