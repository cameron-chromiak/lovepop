import React, {Component} from 'react'
import axios from 'axios'


import {apiURL} from '../API'

class Products extends Component{

  state={
    items: [],
    tags: []
  }


  componentDidMount(){
      axios.get(`${apiURL}/products`, 'hey')
      .then(res =>{
        this.setState({items: res.data.products}) //this is not ideal. it is betting that the cart items returns before this
        this.setState({tags: this.props.productTags});
        this.showRecommendedProducts()
      })
      .catch(err => console.log(err))
  }

  showRecommendedProducts = () =>{
    let items = this.state.items
    let products = []
    console.log(items);

    for(var key in items){

      let obj = items[key]
      for(var prop in obj){
        console.log(obj.tags);
      }
    }

  }




  render(){
    return(
      <div>Products</div>
    )
  }

}

export default Products
