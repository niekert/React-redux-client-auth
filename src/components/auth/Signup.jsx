import React from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends React.Component {

  handleFormSubmit(formProps) {
    //Call action
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
    return (
      <form onSubmit={handleSubmit((formProps) => this.handleFormSubmit(formProps))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email}/>
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" {...password} />
          {password.touched && password.touched && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Email:</label>
          <input type="password" className="form-control" {...passwordConfirm} />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  for(var key in formProps) {
    if(formProps.hasOwnProperty(key)) {
      if (!formProps[key]) {
        errors[key] = 'Please enter a ' + key;
      }
    }
  }

  if(formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match'
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form:'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
