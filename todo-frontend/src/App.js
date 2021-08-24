import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import * as actions from './store/actions/auth';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
  return (
    <>
    <Router {...this.props}>
      <Switch> 
        <Route exact path='/'>
          this.props.isAuthenticated ? <Home/> : <Redirect to="/login"/></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/register'><Register/></Route>
      </Switch>
    </Router>
    </>
  )
}
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
