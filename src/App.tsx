import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Switch } from 'react-router';

import routers from './router';

interface AppProps {
    history: ReturnType<typeof createBrowserHistory>;
}

const App: React.FC<AppProps> = props => {
    return (
        <ConnectedRouter history={props.history}>
            <Switch>
                {/* <Layout> */}
                {routers.map((r, key) => (
                    <Route
                        component={r.component}
                        exact={r.exact}
                        key={key}
                        path={r.path}
                    />
                ))}
                {/* </Layout> */}
            </Switch>
        </ConnectedRouter>
    );
};

export default App;
