import React from 'react';
import PropTypes from 'prop-types';
import { Form, Search, Icon } from 'semantic-ui-react';
import ErrorMessage from '../ErrorMessage';
import Required from '../Required';

export class CustomSearch extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  // handleChange = (event, element) => {
  //   this.props.onChange(this.props.name, element.value);
  // };
  // handleBlur = (event, element) => {
  //   this.props.onBlur(this.props.name, element.value);
  // };

  render() {
    return (
      <Form.Field
        error={
          Boolean(this.props.touched[this.props.name] &&
          this.props.errors[this.props.name])
        }
      >
        {this.props.label ?
          <label htmlFor={this.props.name}>
            {this.props.label}<Required required={this.props.required} />
          </label>
        : null}
        <Search
          fluid={false}
          name={this.props.name}
          className={this.props.className ? `${this.props.className} group-modal-search` : 'group-modal-search'}
          placeholder="Ricerca..."
          showNoResults
          onResultSelect={this.props.onResultSelect}
          onSearchChange={this.props.onSearchChange}
          defaultValue={this.props.defaultValue}
          icon={<Icon name="search" bordered />}
          results={this.props.results}
          value={this.props.value}
        />
        { Boolean(this.props.touched[this.props.name]) && <ErrorMessage>{this.props.errors[this.props.name]}</ErrorMessage>}
      </Form.Field>
    );
  }
}

CustomSearch.propTypes = {
  onResultSelect: PropTypes.func,
  onSearchChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  errors: PropTypes.object,
  results: PropTypes.array,
  required: PropTypes.bool,
  // style: PropTypes.object,
  value: PropTypes.string,
  touched: PropTypes.object,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default CustomSearch;
