import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import withErrorHandler from '../hoc/withErrorHandler';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/BuildControls/BuildControls';
import Modal from '../components/UI/Modal';
import OrderSummary from '../components/Burger/OrderSummary';
import Spinner from '../components/UI/Spinner';
import axios from '../axios-orders';

class BurgerBuilder extends Component {
  state = {
      checkoutStarted: false,
      loading: false,
      error: false
  };

  // componentDidMount() {
  //   axios.get('/ingredients.json')
  //     .then(res => this.setState({ ingredients: res.data }))
  //     .catch(err => this.setState({ error: true }));
  // }

  checkoutHandler = mode => {
    let checkoutStarted;
    switch(mode) {
      case 'proceed': return this.props.history.push('/checkout');
      case 'start': {
        checkoutStarted = true;
        break;
      }
      case 'cancel': {
        checkoutStarted = false;
        break;
      }
      default: return;
    }
    this.setState({ checkoutStarted })
  };

  render() {
    let buildArea = this.state.error ? <p style={{ textAlign: 'center' }}>Could not retrieve application data</p> : <Spinner />;
    let orderSummary = null;
    if(this.props.ingredients) {
      const disabledInputs = { ...this.props.ingredients };
      for(let key in disabledInputs) {
        disabledInputs[key] = disabledInputs[key] <= 0;
      }
      orderSummary = this.state.loading ? <Spinner />
      : (<OrderSummary
            ingredients={this.props.ingredients}
            price={this.props.price}
            checkoutProceed={() => this.checkoutHandler('proceed')}
            checkoutCancel={() => this.checkoutHandler('cancel')}
          />
        );

      buildArea = (
        <>
          <Burger recipe={this.props.ingredients} />
          <BuildControls
            price={this.props.price}
            add={this.props.onIngredientAdd}
            remove={this.props.onIngredientRemove}
            checkout={() => this.checkoutHandler('start')}
            disabled={disabledInputs}
          />
        </>
      );
    }
    
    return (
      <>
        <Modal
          show={this.state.checkoutStarted}
          clear={() => this.checkoutHandler('cancel')}
        >{orderSummary}
        </Modal>
        {buildArea}
      </>
    );
  }
};

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  price: state.totalPrice
}),
  mapDispatchToProps = dispatch => ({
    onIngredientAdd: ingrName => dispatch({ type: actionTypes.ADD_INGREDIENT, payload: ingrName }),
    onIngredientRemove: ingrName => dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: ingrName })
  });

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));