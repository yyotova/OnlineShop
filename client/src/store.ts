import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
 
import reducers from './reducers'
 
const persistConfig = {
  timeout: 2000,
  key: 'root',
  storage,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
} 

export type AppState = ReturnType<typeof reducers>;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 
const persistedReducer = persistReducer(persistConfig, reducers);
export let store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(thunk)))
export let persistor = persistStore(store);

