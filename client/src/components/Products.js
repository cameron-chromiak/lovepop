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
    let tags = this.state.tags
    let products = []
    let allTags =[]

    tags.forEach(array =>{
      allTags.push(...array)
    })

    for(var key in items){
      let obj = items[key]
        if(allTags.some(r=> obj.tags.includes(r))){
          products.push(obj)
        }
      }
      console.log(products);
  }




  render(){
    return(
      <div>Products</div>
    )
  }

}

export default Products