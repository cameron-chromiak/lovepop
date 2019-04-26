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
        this.props.getTags(this.state.cartItems.map(item =>{
          return item.tags
        }))
        this.getTotalPrice()
      })
      .catch(err => console.log(err))
  }


//removes item with that key
  removeItem = (key) => {
    this.setState(prevState => {
      let cartItems = [...prevState.cartItems];
      cartItems.splice(key, 1);
      return {cartItems};
    }, () =>{
      this.props.getTags(this.state.cartItems.map(item =>{
        return item.tags
      })
    )
      this.getTotalPrice()
    })

  }

    getTotalPrice = () => {

      // set cart total to cartTotal
      let cartTotal = 0
      this.state.cartItems.map(item =>{
        return cartTotal = cartTotal + Number(item.price)
      })

      //set cartTotal to state then pass to parent
      this.setState({cartTotal})


    }

    renderFreeShipping(){
      if(this.state.cartTotal > 10000){
        return(
          <div className='ui red tag label'>Free Shipping!</div>
        )
      }
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
                <h5>Free shipping on purchase of more than $10.00! What a deal, Wow woW wOw</h5>
          Total
          <div className="detail">{this.state.cartTotal}</div>
          <div>{this.renderFreeShipping()}</div>
        </div>
      </div>
    )
  }

}

export default CartItem
