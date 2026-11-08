import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem } from './CartSlice'

const plants = [
  // Indoor Plants
  { id: 1, name: 'Snake Plant', price: 18, category: 'Indoor Plants', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=500' },
  { id: 2, name: 'Monstera Deliciosa', price: 25, category: 'Indoor Plants', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500' },
  { id: 3, name: 'Peace Lily', price: 20, category: 'Indoor Plants', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=500' },
  { id: 4, name: 'Golden Pothos', price: 15, category: 'Indoor Plants', image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=500' },
  { id: 5, name: 'Rubber Plant', price: 22, category: 'Indoor Plants', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500' },
  { id: 6, name: 'Areca Palm', price: 30, category: 'Indoor Plants', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500' },

  // Succulents
  { id: 7, name: 'Aloe Vera', price: 12, category: 'Succulents', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500' },
  { id: 8, name: 'Echeveria', price: 10, category: 'Succulents', image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500' },
  { id: 9, name: 'Jade Plant', price: 14, category: 'Succulents', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500' },
  { id: 10, name: 'Haworthia', price: 11, category: 'Succulents', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500' },
  { id: 11, name: 'String of Pearls', price: 16, category: 'Succulents', image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=500' },
  { id: 12, name: 'Zebra Cactus', price: 13, category: 'Succulents', image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500' },

  // Flowering Plants
  { id: 13, name: 'Orchid', price: 28, category: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1566920518018-6b7e3c6f5e5e?w=500' },
  { id: 14, name: 'Anthurium', price: 24, category: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=500' },
  { id: 15, name: 'African Violet', price: 17, category: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500' },
  { id: 16, name: 'Kalanchoe', price: 19, category: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500' },
  { id: 17, name: 'Begonia', price: 21, category: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500' },
  { id: 18, name: 'Geranium', price: 16, category: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500' }
]

function ProductList() {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)

  const categories = [
    'Indoor Plants',
    'Succulents',
    'Flowering Plants'
  ]

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant))
  }

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
            🛒 Cart ({cartItems.reduce(
              (total, item) => total + item.quantity, 0
            )})
          </Link>
        </div>
      </nav>

      <header className="products-header">
        <h1>Our Beautiful Plants</h1>
        <p>Bring nature and freshness into your home.</p>
      </header>

      {categories.map(category => (
        <section className="plant-category" key={category}>
          <h2>{category}</h2>

          <div className="plants-grid">
            {plants
              .filter(plant => plant.category === category)
              .map(plant => {
                const isAdded = cartItems.some(
                  item => item.id === plant.id
                )

                return (
                  <div className="plant-card" key={plant.id}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                    />

                    <h3>{plant.name}</h3>

                    <p className="plant-price">
                      ${plant.price}
                    </p>

                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAdded}
                    >
                      {isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
                    </button>
                  </div>
                )
              })}
          </div>
        </section>
      ))}

    </div>
  )
}

export default ProductList