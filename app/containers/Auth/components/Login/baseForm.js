import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Button } from 'semantic-ui-react';
import { Input } from 'components/Forms/UI/Input';
import './css/styles.css';

function BaseForm(props) {
  return (
    <Form autoComplete="off" onKeyPress={() => props.handleKeyPress} onSubmit={props.handleSubmit} loading={props.isSubmitting}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Input {...props} label="Username" name="rq_Username" placeholder="Username" />
          </Grid.Column>
          <Grid.Column width={16}>
            <Input {...props} type="password" label="Password" name="rq_Password" placeholder="Password" />
          </Grid.Column>
          <Grid.Column width={16}>
            <Button type="submit" color="green" className="btn-action login" onClick={props.handleSubmit} content="Accesso" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
}


BaseForm.propTypes = {
  isSubmitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleKeyPress: PropTypes.func,
};

export default BaseForm;
