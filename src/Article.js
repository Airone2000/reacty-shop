import React from 'react';

function Article({article, addToCartHandler, quantityInCart = 0}) {
  return (
    <div className="article">
      <h3>
        {article.name} 
        {quantityInCart > 0 && `(${quantityInCart})`}
      </h3>
      <button 
        onClick={() => addToCartHandler(article)}
      >
        Add to cart
      </button>
    </div>
  );
}

export default Article;