import React, {Component} from 'react'
import axios from 'axios'


import {apiURL} from '../API'

class CartItem extends Component{

  state={
    cartItems: [],
    cartTotal: 0
  }

  componentDidMount(){
      axios.get(`${apiURL}`, 'hey')
      .then(res =>{
        //set state with cart items returned from axios geg
        this.setState({cartItems: res.data.cart.cart.lineItems})
        // then send tags to parent
        // console.log(this.state.cartItems);
        this.getTags()
      })
      .catch(err => console.log(err))
  }


//removes item with that key
  removeItem = (key) => {

    this.setState(prevState => {
      let cartItems = [...prevState.cartItems];
      cartItems.splice(key, 1);
      return {cartItems};
    })
    this.getTags()
  }

  getTags = () =>{
    this.props.getTags(this.state.cartItems.map(item =>{
      return item.tags
    }))
  }


  render(){

    let {cartItems} = this.state

    return(
      <div className='six wide column'>{cartItems.map((item, key) =>(
        <div className='ui segment' key={key}>
          <h4 className='ui header'>{item.name}</h4>
          <p>{item.price}</p>
          <button onClick={()=>this.removeItem(key)}>Remove</button>
        </div>))}
        <div className="ui label">
          Total
          <div className="detail">{this.state.cartTotal}</div>
        </div>
      </div>
    )
  }

}

export default CartItem
