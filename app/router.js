import React from 'react';
import 'whatwg-fetch'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import WidgetConstructor from './components/WidgetConstructor';
import PromoHeader from './components/PromoHeader';
import FeaturesList from './components/FeaturesList';
import Footer from './components/Footer';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="w-100 wrapper">
            <PromoHeader/>
            <div className="main padding-30">
              <Route exact path="/" component={FeaturesList} />
              <Route exact path="/create" component={WidgetConstructor} />
            </div>
            <Footer />
        </div>
      </Router>
    )
  }

};

export default Routes;