/**
 * Created by orel- on 03/Jul/17.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import Widget from '../Widget';

const PromoHeader = props => (
  <div className="promo-header w-100 d-flex flex-column align-items-center">
    <h1 className="display-4">Cool weather widgets for your website</h1>
    <Widget className="big-widget" city="Moscow" days={7} type="horizontal" />
    <Widget className="small-widget" city="Moscow" days={3} type="vertical" />
    <Link to="/create" className="promo-create-link">
      <button className="btn btn-promo">Create widget</button>
    </Link>
  </div>
);

export default PromoHeader;