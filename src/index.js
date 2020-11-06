import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import { saveLocalStorage } from './localStorage';
import store from './features';

store.subscribe(() => {
	saveLocalStorage({ scratchpads: store.getState().scratchpads, notes: store.getState().notes });
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
