/**
 * Created by orel- on 27/Jun/17.
 */
import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Header from '../Header';
import Widget from '../Widget';

class WidgetConstructor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      ],
      embedLink: 'http://weather.orels1.tips/embed/Moscow?days=1&type=horizontal',
      embedCode: '',
    }
  }

  componentDidMount() {
    const code = this.constructEmbedCode(this.state.embedLink, this.state.type.value, this.state.days.value);
    this.setState(Object.assign({}, this.state, { embedCode: code }));
  }

  constructEmbedCode(link, type, days) {
    return `<div style="height:0; overflow:hidden; padding-bottom: ${((type === 'horizontal' || days === 1) && '17%') || type === 'vertical' && (days === 3 && '24%' || '37%')}; width:100%;">
  <iframe src="${link}" frameborder="0" style="position: absolute; top: 0; height: 100%; width: 100%; overflow: hidden;" />
</div>`
  }

  handleSelectChange(name, val) {
    if (Object.keys(this.state).includes(name)) {
      let change = {};
      change[name] = val;
      const newState = Object.assign({}, this.state, change);
      const link = `http://wather.orels1.tips/embed/${newState.city.value}?days=${newState.days.value}&type=${newState.type.value}`;
      const code = this.constructEmbedCode(link, newState.type.value, newState.days.value);
      Object.assign(newState, { embedCode: code, embedLink: link });
      this.setState(newState);
    }
  }

  render() {
    return (
      <div className="widget-constructor">
        {this.props.header &&
          <Header title="Create new widget" />
        }
        <div className="row">
          <div className="col-5">
            <div className="card widget-constructor-card card-block d-flex flex-wrap flex-column justify-content-between">
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
              <h6>Copy and paste this code onto your website</h6>
              <pre>
                {this.state.embedCode}
              </pre>
            </div>
          </div>
          <div className="col">
            <div className="w-100">
              <Widget
                city={this.state.city.value}
                days={this.state.days.value}
                type={this.state.type.value}
              />
              <div style={{clear: 'both'}} />
            </div>
          </div>
        </div>

      </div>
    )
  }
}

WidgetConstructor.propTypes = {
  header: PropTypes.bool,
};

WidgetConstructor.defaultProps = {
  header: true,
};

export default WidgetConstructor;