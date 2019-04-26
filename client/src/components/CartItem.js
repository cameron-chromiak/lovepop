import React, {Component} from 'react'
import axios from 'axios'

//This component contains active cart Items

//apiURL for axios request kept in seperate file
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


//removes item with that key the returns remaing tags to getTags() to update suggested products
  removeItem = (key) => {
    this.setState(prevState => {
      let cartItems = [...prevState.cartItems]
      cartItems.splice(key, 1);
      return {cartItems}
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
        if(typeof(cartTotal) === 'Nan'){
          cartTotal = cartTotal
        }
        return cartTotal = cartTotal + Number(item.price)
      })

      //set cartTotal to state then pass to parent
      this.setState({cartTotal})


    }

    // if price > FREE_SHIPPING_PRICE, free shippig
    renderFreeShipping(){
      let FREE_SHIPPING_PRICE = 10000

      if(this.state.cartTotal > FREE_SHIPPING_PRICE){
        return(
          <div className='ui red tag label'>Free Shipping!</div>
        )
      }
    }

  render(){
    //Get items in cart to map and render
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
