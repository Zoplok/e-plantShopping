import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/CartSlice.jsx";
import { plantCategories } from "../data/plantData.js";

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <main className="page-shell">
      <div className="page-intro">
        <div className="section-kicker">Plants</div>
        <h1>Choose from our curated plant collection</h1>
        <p>
          Browse by category and add your favorites to the cart. Once a plant is
          added, its button is disabled until you remove it from the cart.
        </p>
      </div>

      {plantCategories.map((category) => (
        <section key={category.category} className="category-block">
          <div className="category-header">
            <h2>{category.category}</h2>
            <span>{category.items.length} plants</span>
          </div>

          <div className="product-grid">
            {category.items.map((product) => {
              const disabled = isInCart(product.id);

              return (
                <article key={product.id} className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-body">
                    <h3>{product.name}</h3>
                    <p className="price">${product.price.toFixed(2)}</p>
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => dispatch(addToCart(product))}
                      disabled={disabled}
                    >
                      {disabled ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}

