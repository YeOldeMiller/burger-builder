import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../store/actions';
import FormInput from '../components/UI/FormInput';
import Button from '../components/UI/Button';
import Spinner from '../components/UI/Spinner';
import validateFormData from '../utility/validateFormData';
import styles from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'email'
        },
        validation: {
          required: true,
          isEmail: true
        },
        value: '',
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password'
        },
        validation: {
          required: true,
          minLength: 6
        },
        value: '',
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    signUpMode: true
  };

  switchAuthModeHandler = () => {
    this.setState(state => ({
      signUpMode: !state.signUpMode
    }));
  }

  formInputHandler = ({ target: { value } }, id) => {
    this.setState(state => {
      const valid = validateFormData(value, state.controls[id].validation);
      const controls = {
        ...state.controls,
        [id]: {
          ...state.controls[id],
          value,
          valid,
          touched: true
        }
      };
      const formIsValid = Object.keys(controls).every(e => controls[e].valid);
      return { controls, formIsValid };
    });
  }

  authHandler = e => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.signUpMode);
  }

  render() {
    if(this.props.isAuthenticated) {
      if(this.props.hasBurger) return <Redirect to="/checkout" />
      return <Redirect to="/" />
    }
    const formArray = [];
    for(let key in this.state.controls) {
      formArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = <Spinner />;
    if(!this.props.loading) form = (
      formArray.map(({ id, config: { elementType, elementConfig, validation, value, valid, touched } }) => (
        <FormInput
          key={id}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          validation={!!validation}
          valid={valid}
          touched={touched}
          change={e => this.formInputHandler(e, id)}
      />))
    );
    let errorMsg = this.props.error && <p>{this.props.error.message}</p>
    return (
      <div className={styles.Auth}>
        {errorMsg}
        <form onSubmit={this.authHandler}>
          {form}
          <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
        </form>
        <Button btnType="Danger" click={this.switchAuthModeHandler}>{this.state.signUpMode ? 'ALREADY REGISTERED?' : 'NEW USER?'}</Button>
      </div>
    )
  };
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: !!state.auth.idToken,
  hasBurger: state.burger.ingredients && Object.values(state.burger.ingredients).reduce((a, b) => a + b, 0)
}),
  mapDispatchToProps = dispatch => ({
  onAuth: (email, password, signup) => dispatch(actions.auth(email, password, signup))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);