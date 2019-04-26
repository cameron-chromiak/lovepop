import React, { Component } from 'react';



import CartItem from './components/CartItem'
import Products from './components/Products'

class App extends Component {

  state={
    tags: []
  }

  getCartItemTags = (tags) =>{
    this.setState({tags})
  }


  render() {
    return (
      <div className="App ui grid">
          <CartItem getTags={this.getCartItemTags}/>
          <Products productTags={this.state.tags}/>
      </div>
    );
  }
}

export default App;
