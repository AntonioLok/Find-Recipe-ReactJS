import React, { Component } from 'react';
import Home from './Home';
import Recipe from './Recipe';
import Meal from './Meal';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import '../styles/App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <Switch >
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={ Home } />
            <Route exact path="/recipe/:ingredient" component={ Recipe } />
            <Route exact path="/recipe/:ingredient/:meal" component={ Meal } />
            <Route exact path="*" render={() => <h1> Error 404, Page does not exist </h1>} />
          </Switch >
        </div>
      </Router>
    );
  }
}

export default App;
