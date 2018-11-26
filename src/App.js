import React from 'react';
import Menu from './Menu';
import Article from './Article';
import Notification from './Notification';
import Counter from './Counter';
import {ARTICLES} from './data';

class App extends React.Component
{

  state = {
    currentPage: 'list_articles', // or "cart"
    cart: [],
    articleQuantity: {},
    notifications: []
  };

  // Store the timeout which trigger the function
  // to hide notifications
  timeoutNotification;

  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleIncrementCartArticle = this.handleIncrementCartArticle.bind(this);
    this.handleDecrementCartArticle = this.handleDecrementCartArticle.bind(this);
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

    // Display notification when adding new item to cart
    this.setState({
      notifications: [...this.state.notifications, {
        id: 1,
        message: `Item ${item.name} added to cart.`
      }]
    });
    
  }


  handleIncrementCartArticle(article) {
    const quantity = {...this.state.quantity};
    quantity[article.id]++;
    this.setState({
      quantity,
      notifications: [...this.state.notifications, {
        id: 1,
        message: 'Quantity updated!'
      }]
    });
  }

  handleDecrementCartArticle(article) {
    const quantity = {...this.state.quantity};
    quantity[article.id]--;
    
    if(quantity[article.id] < 0) {
      quantity[article.id] = 0;
    }

    if(quantity[article.id] === 0) {
      if(window.confirm('Supprimer du panier')) {
        const cart = [...this.state.cart];
        const indexOfArticle = cart.indexOf(article);
        cart.splice(indexOfArticle, 1);
      
        this.setState({
          quantity, cart,
          notifications: [...this.state.notifications, {
            id: 1,
            message: 'Deleted!'
          }]
        });
      }
      else {
        quantity[article.id] = 1;
        this.setState({
          quantity
        });
      }
    }
    else {
      this.setState({
        quantity,
        notifications: [...this.state.notifications, {
          id: 1,
          message: 'Quantity updated!'
        }]
      });
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
                >

                  <button 
                    onClick={() => this.handleAddToCart(article)}
                  >
                    Add to cart
                  </button>
                </Article>
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
                >
                  <Counter 
                    onIncrement={() => {
                      this.handleIncrementCartArticle(article)
                    }} 
                    onDecrement={() => {
                      this.handleDecrementCartArticle(article)
                    }} 
                    value={this.state.quantity[article.id]} 
                  />
                </Article>
              </li>
            )}
          </ul>
        );
        break;
    }
  }

  componentDidUpdate() {
  
    // remove notification if any
    if(this.state.notifications.length > 0) {

      if(this.timeoutNotification) {
        clearTimeout(this.timeoutNotification);
      }

      this.timeoutNotification = setTimeout(() => {
        this.setState({...this.state, notifications: []});
      }, 2000);
    }
  }

  render() {
    return (
      <div className="app">
        <Menu 
          pageChangeHandler={this.handleChangePage} 
          selectedPage={this.state.currentPage} 
        />

        { /* Displaying notifications */ }
        {this.state.notifications.length > 0 && (
          <ul className="notifications">
            {this.state.notifications.map(notification =>
              <li className="notification" key={notification.id}>
                <Notification message={notification.message} />
              </li>
            )}
          </ul>
        )}

        <div className="content">
          {this.getPage()}
        </div>
      </div>
    );
  }
}

export default App;