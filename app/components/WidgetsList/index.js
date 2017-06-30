/**
 * Created by orel- on 27/Jun/17.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

class WidgetsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widgets: [
        {
          id: '213123',
          title: 'Widget 1',
          city: 'Moscow',
          days: 3,
          lang: 'RU',
          img: '/static/img/placeholder.jpg'
        }
      ],
    };
  }

  render() {
    const widgets = this.state.widgets.map(widget => (
      <div className="card interactive" key={widget.id}>
        <img className="card-img-top img-fluid" src={widget.img} />
        <div className="card-block">
          <h4 className="card-title">{widget.title}</h4>
          <ul className="list-group">
            <li className="list-group-item d-flex">
              <div className="mr-auto">City</div>
              <div className="ml-auto"><b>{widget.city}</b></div>
            </li>
            <li className="list-group-item d-flex">
              <div className="mr-auto">Days</div>
              <div className="ml-auto"><b>{widget.days}</b></div>
            </li>
            <li className="list-group-item d-flex">
              <div className="mr-auto">Language</div>
              <div className="ml-auto"><b>{widget.lang}</b></div>
            </li>
          </ul>
        </div>
      </div>
    ));
    return (
      <div>
        <Header title="Widgets">
          <Link to="/create" className="align-self-center"><i className="fa fa-plus-circle fa-3x add-widget-btn"></i></Link>
        </Header>
        <div className="d-flex justify-content-between w-100 flex-wrap widgets-list">
          {widgets}
        </div>
      </div>
    )
  }

}

export default WidgetsList;
