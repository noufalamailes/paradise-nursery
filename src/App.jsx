
import './App.css'
import AboutUs from './AboutUs'
import ProductList from './ProductList'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  removeItem,
  updateQuantity
} from './CartSlice'


function Home() {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <Link to="/" className="brand">
          🌿 Paradise Nursery
        </Link>
        <span>Indoor Plants & Nature</span>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1>Welcome to Paradise Nursery</h1>
          <h2>Bring Nature Into Your Home</h2>

          <p>
            Discover beautiful houseplants and transform
            your home into a peaceful green paradise.
          </p>

          <Link to="/plants" className="get-started">
            Get Started
          </Link>
        </div>
      </main>

      <section id="about">
        <AboutUs />
      </section>
    </div>
  )
}


// Shopping Cart Page

function CartPage() {

  const dispatch = useDispatch()

  const cartItems = useSelector(
    state => state.cart.items
  )

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="products-page">

      <nav className="navbar">

        <Link to="/" className="brand">
          🌿 Paradise Nursery
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>

          <Link to="/cart">
            Cart ({cartItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            )})
          </Link>
        </div>

      </nav>

      <h1 className="cart-title">
        Shopping Cart 🛒
      </h1>

      {cartItems.length === 0 ? (

        <div className="empty-cart">

          <h2>Your Cart is Empty</h2>

          <p>
            Looks like you haven't added any plants yet.
          </p>

          <Link to="/plants">
            Continue Shopping
          </Link>

        </div>

      ) : (

        <div className="cart-container">

          {cartItems.map(item => (

            <div className="cart-item" key={item.id}>

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-details">

                <h2>{item.name}</h2>

                <p>
                  Price: ${item.price}
                </p>

                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      dispatch(updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1
                      }))
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1
                      }))
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch(removeItem(item.id))
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

          <div className="cart-total">

            <h2>
              Total: ${total.toFixed(2)}
            </h2>

            <Link to="/plants">
              Continue Shopping
            </Link>

          </div>

        </div>

      )}

    </div>
  )
}


// Main App

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/plants" element={<ProductList />} />

        <Route path="/cart" element={<CartPage />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App
