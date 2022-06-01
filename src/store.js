import {createStore} from 'redux';
import appReducer from './reducers/appReducer';

const initialState = []
  
const store = createStore(appReducer, initialState);

export default store;