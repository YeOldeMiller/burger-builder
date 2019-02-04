import React, { Component } from 'react';
import Layout from './containers/Layout';
import BurgerBuilder from './containers/BurgerBuilder';


export default class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
      </Layout>
    );
  }
}

