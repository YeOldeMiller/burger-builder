import React, { Component } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../components/Navigation/Toolbar';
import SideDrawer from '../components/Navigation/SideDrawer';

export default class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  
  sideDrawerHandler = () => this.setState(state => ({ showSideDrawer: !state.showSideDrawer }));

  render() {
    return (
      <>
        <Toolbar toggle={this.sideDrawerHandler} />
        <SideDrawer show={this.state.showSideDrawer} clear={this.sideDrawerHandler} />
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </>
    );
  }
};
