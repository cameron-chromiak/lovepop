import React, { Component } from 'react';



import CartItem from './components/CartItem'
import Products from './components/Products'

class App extends Component {

  state={}



  render() {
    return (
      <div className="App ui grid">
          <CartItem/>
          {/*<Products/>*/}
      </div>
    );
  }
}

export default App;
