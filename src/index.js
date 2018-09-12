import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import { createStore,applyMiddleware } from 'redux';
import dataService from './services/dataService'
import CalendarReducer from './reducers/CalendarReducer';

const store = createStore(CalendarReducer,{},applyMiddleware(dataService));

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

store.dispatch({ type: 'GET_DATA' })