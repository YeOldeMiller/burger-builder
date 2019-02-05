import React, { Component } from 'react';
import withErrorHandler from '../hoc/withErrorHandler';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/BuildControls/BuildControls';
import Modal from '../components/UI/Modal';
import OrderSummary from '../components/Burger/OrderSummary';
import Spinner from '../components/UI/Spinner';
import axios from '../axios-orders';

const INGREDIENT_PRICES = {
  base: 4,
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
      ingredients: null,
      totalPrice: INGREDIENT_PRICES.base,
      checkoutStarted: false,
      loading: false,
      error: false
  };

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(res => this.setState({ ingredients: res.data }))
      .catch(err => this.setState({ error: true }));
  }

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
        this.setState({ loading: true });
        const order = {
          ingredients: this.state.ingredients,
          price: this.state.totalPrice
        }
        console.log(this.state.loading);
        return axios.post('/orders.json', order)
          .then(console.log)
          .catch(console.log)
          .finally(setTimeout(() => this.setState({ loading: false, checkoutStarted: false }), 500));
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
    let buildArea = this.state.error ? <p style={{ textAlign: 'center' }}>Failed retrieving application data</p> : <Spinner />;
    let orderSummary = null;
    if(this.state.ingredients) {
      const disabledInputs = { ...this.state.ingredients };
      for(let key in disabledInputs) {
        disabledInputs[key] = disabledInputs[key] <= 0;
      }
      if(this.state.loading) orderSummary = <Spinner />;
      else orderSummary = (<OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            checkoutProceed={() => this.checkoutHandler('proceed')}
            checkoutCancel={() => this.checkoutHandler('cancel')}
          />
        );
      buildArea = (
        <>
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

export default withErrorHandler(BurgerBuilder, axios);