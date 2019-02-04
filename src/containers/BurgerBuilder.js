import React, { Component } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/BuildControls/BuildControls';
import Modal from '../components/UI/Modal';
import OrderSummary from '../components/Burger/OrderSummary';

const INGREDIENT_PRICES = {
  base: 4,
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export default class BurgerBuilder extends Component {
  state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: INGREDIENT_PRICES.base,
      checkoutStarted: false
  };

  modIngredientHandler = type => mod => {
    this.setState(prevState => {
      if(prevState.ingredients[type] + mod < 0) return;
      return {
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] + mod
        },
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type] * mod
      };
    });
  };

  checkoutHandler = mode => {
    let checkoutStarted;
    switch(mode) {
      case 'proceed': {
        return alert('Proceed to checkout');
      }
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
    const disabledInputs = { ...this.state.ingredients };
    for(let key in disabledInputs) {
      disabledInputs[key] = disabledInputs[key] <= 0;
    }

    return (
      <>
        <Modal
          show={this.state.checkoutStarted}
          clear={() => this.checkoutHandler('cancel')}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            checkoutProceed={() => this.checkoutHandler('proceed')}
            checkoutCancel={() => this.checkoutHandler('cancel')}
          />
        </Modal>
        <Burger recipe={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          addOrRemove={this.modIngredientHandler}
          checkout={() => this.checkoutHandler('start')}
          disabled={disabledInputs}
        />
      </>
    );
  }
};
