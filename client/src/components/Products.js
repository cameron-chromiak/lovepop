import React, {Component} from 'react'
import axios from 'axios'


import {apiURL} from '../API'

class Products extends Component{

  state={
    items: [],
    tags: [],
    suggestedProducts: []
  }

  componentDidMount(){
      axios.get(`${apiURL}/products`, 'hey')
      .then(res =>{
        this.setState({items: res.data.products}) //this is not ideal. it is betting that the cart items returns before this
        this.setState({tags: this.props.productTags});
        // console.log(this.state.tags);
        this.showRecommendedProducts()
      })
      .catch(err => console.log(err))
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps.productTags);
    this.setState({tags: nextProps.productTags})
    this.showRecommendedProducts()
 }

  showRecommendedProducts = () =>{
    let items = this.state.items
    let tags = this.state.tags
    let products =[]
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
      // console.log(products);
      this.setState({suggestedProducts: products})
  }




  render(){

    let {suggestedProducts} = this.state
    console.log(suggestedProducts);

    return(
      <div>
      <div className='six wide column'>{suggestedProducts.map((item, key) =>(
        <div className='ui segment' key={key}>
          <h4 className='ui header'>{item.name}</h4>
          <p>{item.price}</p>
          <button>Add to cart</button>
        </div>))}
      </div>
      </div>
    )
  }

}

export default Products
