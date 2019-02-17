import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Layout.module.css';
import Toolbar from '../components/Navigation/Toolbar';
import SideDrawer from '../components/Navigation/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  
  sideDrawerHandler = () => this.setState(state => ({ showSideDrawer: !state.showSideDrawer }));

  render() {
    return (
      <>
        <Toolbar auth={this.props.isAuthenticated} toggle={this.sideDrawerHandler} />
        <SideDrawer auth={this.props.isAuthenticated} show={this.state.showSideDrawer} clear={this.sideDrawerHandler} />
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </>
    );
  }
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.idToken
});

export default connect(mapStateToProps)(Layout);