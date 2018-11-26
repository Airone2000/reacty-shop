import React from 'react';
import './Menu.css';

function Menu({pageChangeHandler, selectedPage}) {
  return (
    <nav className="menu">
      <ul>
        <li>
          <MenuItem 
            pageChangeHandler={pageChangeHandler} 
            pageId="list_articles"
            selected={selectedPage === 'list_articles'}
          >
            Articles
          </MenuItem>
        </li>
        <li>
          <MenuItem 
            pageChangeHandler={pageChangeHandler} 
            pageId="cart"
            selected={selectedPage === 'cart'}
          >
            Panier
          </MenuItem>
        </li>
      </ul>
    </nav>
  );
}

function MenuItem({children, pageChangeHandler, pageId, selected}) {
  return (
    <a 
      href="javascript:;" 
      onClick={ () => pageChangeHandler(pageId) }
      className={selected ? 'selected' : null}
    >
      {children}
    </a>
  );
}

export default Menu;