import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Switch, BrowserRouter, Route, HashRouter } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './store/Store'
import MainPage from './pages/MainPage'
import DataPage from './pages/DataPage'



const app = (
    <Provider store={store}>
        <BrowserRouter>
            <HashRouter basename='/'>
                <Switch>
                    <Route path='/' exact component={MainPage} />
                    <Route path={`/tasks/:index`} exact component={DataPage} />
                    <Route render={() => <h1>404 not found</h1>} />
                </Switch>
             </HashRouter>
        </BrowserRouter>       
    </Provider>
)



// store.subscribe(()=> {
//     localStorage.setItem('reduxState', JSON.stringify(store.getState()))
// })


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
