import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import rootRoute from './routes';
export default class App extends React.Component {
    render() {
        return(
            <BrowserRouter
                routes={rootRoute}
            />
        );
    }
}