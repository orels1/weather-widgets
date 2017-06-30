/**
 * Created by orel- on 27/Jun/17.
 */
import React from 'react';
import Select from 'react-select';
import Header from '../Header';
import Widget from '../Widget';

class WidgetConstructor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      days: { label: 1, value: 1 },
      daysOptions: [
        { label: '1', value: 1 },
        { label: '3', value: 3 },
        { label: 'Week', value: 7 },
      ],
      city: { label: 'Moscow', value: 'Moscow' },
      cityOptions: [
        { label: 'Moscow', value: 'Moscow' },
        { label: 'St. Petersburg', value: 'St. Petersburg' },
        { label: 'Novosibirsk', value: 'Novosibirsk' },
      ],
      type: { label: 'Horizontal', value: 'horizontal' },
      typeOptions: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ]
    }
  }

  handleChange(event) {
    if (Object.keys(this.state).includes(event.target.name)) {
      let change = {};
      change[event.target.name] = event.target.value || '';
      this.setState(Object.assign({}, this.state, change));
    }
  }

  handleSelectChange(name, val) {
    if (Object.keys(this.state).includes(name)) {
      let change = {};
      change[name] = val;
      this.setState(Object.assign({}, this.state, change));
    }
  }

  render() {
    return (
      <div className="widget-constructor">
        <Header title="Create new widget" />
        <div className="row">
          <div className="col-6">
            <div className="card widget-constructor-card card-block d-flex flex-wrap flex-column justify-content-between">
              <div className="form-group">
                <input
                  className="form-control title-control"
                  type="text"
                  name="title"
                  placeholder="Click to edit title"
                  value={this.state.title}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group row">
                <label className="col">Forecast days</label>
                <Select
                  name="days"
                  value={this.state.days}
                  options={this.state.daysOptions}
                  onChange={this.handleSelectChange.bind(this, 'days')}
                  clearable={false}
                  className="col"
                />
              </div>
              <div className="form-group row">
                <label className="col">City</label>
                <Select
                  name="city"
                  value={this.state.city}
                  options={this.state.cityOptions}
                  onChange={this.handleSelectChange.bind(this, 'city')}
                  clearable={false}
                  className="col"
                />
              </div>
              <div className="form-group row">
                <label className="col">Widget orientation</label>
                <Select
                  name="type"
                  value={this.state.type}
                  options={this.state.typeOptions}
                  onChange={this.handleSelectChange.bind(this, 'type')}
                  clearable={false}
                  className="col"
                />
              </div>
              <button className="btn btn-primary btn-control">
                Create widget
              </button>
            </div>
          </div>
          <div className="col">
            <div className="w-100">
              <Widget
                title={this.state.title}
                city={this.state.city.value}
                days={this.state.days.value}
                type={this.state.type.value}
              />
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default WidgetConstructor;