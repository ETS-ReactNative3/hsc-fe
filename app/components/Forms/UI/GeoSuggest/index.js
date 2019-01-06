import React from 'react';
import Suggest from 'react-geosuggest';
import { Form, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './css/styles.css';

import ErrorMessage from '../ErrorMessage';
import VoE from '../../../../shared/lib/ValidOrEmpty';
import Required from '../Required';

export class GeoSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleChange = (value) => {
    if (value) {
      if (!value.gmaps) return undefined;
      const components = value.gmaps.address_components;
      const streetNumber = VoE(
        _.filter((components1, item) => item.types[0] === 'street_number')[0],
        'long_name',
      );
      const street = VoE(
        _.filter((components1, item) => item.types[0] === 'route')[0],
        'long_name',
      );
      const city =
        VoE(
          _.filter((components1, item) => item.types[0] === 'locality')[0],
          'long_name',
        ) ||
        VoE(
          _.filter(
            components,
            (item) => item.types[0] === 'administrative_area_level_1',
          )[0],
          'long_name',
        );
      const provinceShort = VoE(
        _.filter(
          components,
          (item) => item.types[0] === 'administrative_area_level_2',
        )[0],
        'short_name',
      );
      const cap = VoE(
        _.filter((components1, item) => item.types[0] === 'postal_code')[0],
        'long_name',
      );
      const country = VoE(
        _.filter((components1, item) => item.types[0] === 'country')[0],
        'long_name',
      );
      const countryShort = VoE(
        _.filter((components1, item) => item.types[0] === 'country')[0],
        'short_name',
      );
      let item = _.cloneDeep(this.props.element);
      _.remove(item, {
        tipo: this.props.name,
      });
      item = {
        street,
        streetNumber,
        city,
        provinceShort,
        cap,
        country,
        countryShort,
        id: _.get(this.props.element, 'id'),
      };
      this.props.onChange(this.props.name, item);
    } else {
      const data = {
        id: _.get(this.props.element, 'id'),
        street: null,
        streetNumber: null,
        city: null,
        provinceShort: null,
        cap: null,
        country: null,
        countryShort: null,
      };
      this.props.onChange(this.props.name, data);
    }
    return undefined;
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { touched, error, name } = this.props;
    return (
      <div>
        <Form.Field error={Boolean(touched[name] && error[name])}>
          <label htmlFor={this.props.name} style={{ display: 'inline-block' }}>
            {this.props.label}
            <Required required={this.props.required} />
          </label>
          <div className={'inline_flex_div'}>
            <Suggest
              autoActivateFirstSuggest
              onBlur={this.handleBlur}
              country="it"
              types={this.props.types} // ['(cities)'] or ['(address)']
              initialValue={this.props.initialValue}
              onSuggestSelect={this.handleChange}
              placeholder={this.props.label}
              className="full_width"
              suggestsClassName={'geosuggest_list'}
              name={this.props.name}
            />
            <div className="search_place">
              <Icon name="search" />
            </div>
          </div>
          {touched[name] && error[name] && (
            <ErrorMessage>{error[name]}</ErrorMessage>
          )}
        </Form.Field>
      </div>
    );
  }
}

GeoSuggest.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  element: PropTypes.any,
  required: PropTypes.bool,
  types: PropTypes.array,
  touched: PropTypes.object,
};
