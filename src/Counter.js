import React from 'react';

function Counter({onIncrement, onDecrement, value}) {
  return (
    <div className="counter">
      <button onClick={onDecrement}>-</button>
      <span>{value}</span>
      <button onClick={onIncrement}>+</button>
    </div>
  );
}

export default Counter;