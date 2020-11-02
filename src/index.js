import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import App from './components/App';
import reducers from './reducers';
import { loadLocalStorage, saveLocalStorage } from './localStorage';

const persistedState = loadLocalStorage();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;
const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware()));

store.subscribe(() => {
	saveLocalStorage({ scratchpads: store.getState().scratchpads, notes: store.getState().notes });
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
