import React, { Component } from 'react'
import './App.css';
import ProductList from './components/product-list';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      itemsData: []
    };
  }

  componentDidMount() {
    fetch("https://fh-api-dev.herokuapp.com/api/products-service/products/website/CAD?page=2&limit=6")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            itemsData: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    return (
      <>
        <ProductList items={this.state.itemsData}></ProductList>
      </>
    );
  }
}
