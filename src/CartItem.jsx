
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">
          Cart ({cartCount})
        </Link>
      </nav>

      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/plants">Continue Shopping</Link>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1
                      })
                    )
                  }
                >
                  -
                </button>

                <span> {item.quantity} </span>

                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1
                      })
                    )
                  }
                >
                  +
                </button>

                <button
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2>
            Total Amount: ${totalAmount.toFixed(2)}
          </h2>

          <button onClick={() => alert('Coming Soon!')}>
            Checkout
          </button>

          <Link to="/plants">
            <button>Continue Shopping</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default CartItem;
