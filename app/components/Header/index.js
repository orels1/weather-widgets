/**
 * Created by orel- on 27/Jun/17.
 */
import React from 'react';

const Header = props => (
  <div className="d-flex header">
    <h1 className="display-4">{props.title}</h1>
    {props.children}
  </div>
);

export default Header;