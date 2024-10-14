import React from 'react';
import {createRoot} from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from 'app/App';
import {store} from 'app/store';


const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
export const rerenderEntireTree=()=>{
    root.render(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>,
    );
}

rerenderEntireTree()

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('app/App', () => {
        rerenderEntireTree()
    })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
