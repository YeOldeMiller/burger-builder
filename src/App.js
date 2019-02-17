import React, { Component, Suspense } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/';
import Layout from './containers/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Logout';
import Spinner from './components/UI/Spinner';

const Checkout = React.lazy(() => import('./containers/Checkout')),
  Orders = React.lazy(() => import('./containers/Orders')),
  Auth = React.lazy(() => import('./containers/Auth'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <>
        <Switch>
          <Route path="/auth" exact render={() => (<Suspense fallback={<Spinner />}><Auth /></Suspense>)} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </>
    );
    if(this.props.isAuthenticated) routes = (
      <>
        <Switch>
          <Route path="/auth" exact render={() => (<Suspense fallback={<Spinner />}><Auth /></Suspense>)} />
          <Route path="/checkout" render={() => (<Suspense fallback={<Spinner />}><Checkout /></Suspense>)} />
          <Route path="/orders" exact render={() => (<Suspense fallback={<Spinner />}><Orders /></Suspense>)} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </>
    )
    return (
      <div>
        <Layout>
          {routes} 
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.idToken
}),
  mapDispatchToProps = dispatch => ({
  onTryAutoSignIn: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));