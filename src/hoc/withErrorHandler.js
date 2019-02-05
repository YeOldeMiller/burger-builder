import React, { Component } from 'react';
import Modal from '../components/UI/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };

      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => this.setState({ error }));
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return(
        <>
          <Modal
            show={this.state.error}
            clear={() => this.setState({ error: null })}
          >
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent { ...this.props } />
        </>
      );
    }
  };
};

export default withErrorHandler;