import { ConnectedRouter, RouterState } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';

import AuthLayout from './layout/AuthLayout';
import LoadingLayout from './layout/LoadingLayout';
import { RootState } from './redux';
import routers from './router';

interface OwnProps {
    history: ReturnType<typeof createBrowserHistory>;
}

interface DispatchProps {}

interface StateProps {
    loading: boolean;
    router: RouterState<unknown>;
}

const mapStateToProps = (state: RootState): StateProps => ({
    loading: state.loading.loading,
    router: state.router,
});

type AppProps = OwnProps & DispatchProps & StateProps;

const App: React.FC<AppProps> = props => {
    return (
        <ConnectedRouter history={props.history}>
            <AuthLayout>
                <LoadingLayout>
                    <Switch>
                        {routers.map((r, key) => (
                            <Route
                                render={r.render}
                                exact={r.exact}
                                key={key}
                                path={r.path}
                            />
                        ))}
                    </Switch>
                </LoadingLayout>
            </AuthLayout>
        </ConnectedRouter>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps
)(App);
