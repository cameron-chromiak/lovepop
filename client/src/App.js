import React, { Component } from 'react';


import CartItem from './components/CartItem'
import Products from './components/Products'

class App extends Component {

  state={
    tags: [],
    cartTotal: 0,
    newCartItem: []
  }

//Tags from items in cart
  getCartItemTags = (tags) =>{
    // console.log(tags);
    this.setState({tags})
  }

  //pass new item from <Products> to <CartItem>
  sendItemToCart = (item) =>{
    this.setState({newCartItem: item}
    )
  }



  render() {

    return (
      <div className="App ui grid">
          <CartItem newItems={this.state.newCartItem}  getTags={this.getCartItemTags}/>
          <Products sendItemToApp={this.sendItemToCart} productTags={this.state.tags}/>
      </div>
    );
  }
}

export default App;
