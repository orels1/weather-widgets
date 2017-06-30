/**
 * Created by orel- on 27/Jun/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      title: '',
      city: '',
      days: 1,
      forecast: [],
    };
    Object.assign(this.state, this.props);
  }

  componentDidMount() {
    fetch(`/api/weather/forecast/${this.state.city}?days=${this.state.days}`)
      .then(response => response.json())
      .then((json) => {
        this.setState(Object.assign({}, this.state, { forecast: json.results }));
      })
      .catch((err) => console.log(err));
  }

  // TODO: refactor this :P
  componentWillReceiveProps(nextProps) {
    if (nextProps.city !== this.props.city
        || nextProps.days !== this.props.days) {
      fetch(`/api/weather/forecast/${nextProps.city}?days=${nextProps.days}`)
        .then(response => response.json())
        .then((json) => {
          this.setState(Object.assign({}, this.state, { forecast: json.results, city: nextProps.city }));
        })
        .catch((err) => console.log(err));
    } else if (nextProps.type !== this.props.type) {
      this.setState(Object.assign({}, this.state, { type: nextProps.type }));
    }
  }

  render() {
    const days = this.state.forecast.map(day => (
      <div className="card d-flex flex-column">
        <img className="card-img-top weather-condition" src={day.day.condition.icon} title={day.day.condition.text} />
        <div className="card-block">
          <ul className="list-group d-flex flex-column align-items-center">
            <li className="list-group-item">
              <b>{day.tempts.day.temp_c} C</b>
            </li>
            <li className="list-group-item temp-night">
              <b>{day.tempts.night.temp_c} C</b>
            </li>
          </ul>
          <div className="widget-date">
            {moment(day.date).format('DD MMM')}
          </div>
        </div>
      </div>
    ));
    return (
      <div className={`card widget d-flex flex-column ${this.state.type === 'vertical' && 'widget-vertical'}`}>
        <div className="card-block">
          <h4 className="card-title">{this.state.city}</h4>
        </div>
        <div className={`d-flex forecast-container flex-row ${this.state.days === 1 ? 'justify-content-center' : 'justify-content-between'}`}>
          {days}
        </div>
      </div>
    )
  }
}

Widget.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  city: PropTypes.string,
  days: PropTypes.number,
};

Widget.defaultProps = {
  type: 'horizontal',
  title: 'Example widget',
  city: 'Moscow',
  days: 1,
};

export default Widget;
