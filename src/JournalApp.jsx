import React from 'react';
import { Provider } from 'react-redux';
import AppStore from './redux/Store';
import AppRouter from './routers/AppRouter';

const JournalApp = () => {

    return <Provider store={ AppStore }>
        <AppRouter />
    </Provider>;
}

export default JournalApp;