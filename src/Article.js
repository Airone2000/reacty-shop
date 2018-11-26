import React from 'react';

function Article({article, children}) {
  return (
    <div className="article">
      <h3>
        {article.name} 
      </h3>
      
      {children}
    </div>
  );
}

export default Article;