import React from 'react';
import 'whatwg-fetch'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import WidgetsList from './components/WidgetsList';
import WidgetConstructor from './components/WidgetConstructor';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="w-100 row wrapper">
          <div className="col sidebar padding-30">
          </div>
          <div className="col main padding-30">
            <Route exact path="/" component={WidgetsList} />
            <Route exact path="/create" component={WidgetConstructor} />
          </div>
        </div>
      </Router>
    )
  }

};

export default Routes;