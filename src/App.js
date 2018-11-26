import React from 'react';
import Menu from './Menu';
import Article from './Article';
import {ARTICLES} from './data';

class App extends React.Component
{

  state = {
    currentPage: 'list_articles', // or "cart"
    cart: [],
    articleQuantity: {}
  };

  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleChangePage(page) {
    console.log('Page changed: ', page);
    this.setState({
      currentPage: page
    });
  }

  handleAddToCart(item) {

    let itemIndex = this.state.cart.indexOf(item);

    if(itemIndex === -1) {
      const quantity = {...this.state.quantity};
      quantity[item.id] = 1;
      this.setState({
        cart: [...this.state.cart, item], quantity
      });
      console.log('Added to cart:', item);
    }
    else {
      const quantity = {...this.state.quantity};
      quantity[item.id]++;
      this.setState({quantity});
      console.log('Update quantity:', item, quantity[item.id]);
    }

    
  }

  getPage() {
    switch(this.state.currentPage) {
      case 'list_articles':
        return (
          <ul>
            {ARTICLES.map(article =>
              <li key={article.id}>
                <Article 
                  article={article}
                  addToCartHandler={this.handleAddToCart}
                />
              </li>
            )}
          </ul>
        );
        break;

      case 'cart':
        return (
          <ul>
            {this.state.cart.map(article =>
              <li key={article.id}>
                <Article
                  article={article}
                  quantityInCart={this.state.quantity[article.id] || 0}
                />
              </li>
            )}
          </ul>
        );
        break;
    }
  }

  render() {
    return (
      <div className="app">
        <Menu 
          pageChangeHandler={this.handleChangePage} 
          selectedPage={this.state.currentPage} 
        />
        <div className="content">
          {this.getPage()}
        </div>
      </div>
    );
  }
}

export default App;