import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import AboutUs from "./components/AboutUs.jsx";
import CartItem from "./components/CartItem.jsx";
import ProductList from "./components/ProductList.jsx";

function LandingPage({ onGetStarted }) {
  return (
    <section className="landing-page">
      <div className="background-image">
        <div className="landing-content">
          <div className="landing-brand">
            <span>Paradise Nursery</span>
          </div>
          <h1>Bring home plants that make every room feel alive.</h1>
          <p>
            Explore a beautifully curated selection of houseplants, outdoor
            favorites, and easy-care succulents.
          </p>
          <div className="landing-actions">
            <button type="button" className="primary-button" onClick={onGetStarted}>
              Get Started
            </button>
          </div>
          <AboutUs />
        </div>
      </div>
    </section>
  );
}

function AppContent() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const navigate = (view) => {
    if (view === "landing") {
      setShowProductList(false);
      setShowCart(false);
      return;
    }

    if (view === "products") {
      setShowProductList(true);
      setShowCart(false);
      return;
    }

    if (view === "cart") {
      setShowProductList(true);
      setShowCart(true);
    }
  };

  let page = <LandingPage onGetStarted={() => setShowProductList(true)} />;

  if (showProductList && !showCart) {
    page = <ProductList onNavigate={navigate} cartCount={cartCount} />;
  }

  if (showProductList && showCart) {
    page = (
      <CartItem
        cartCount={cartCount}
        onNavigate={navigate}
        onContinueShopping={() => {
          setShowCart(false);
          setShowProductList(true);
        }}
      />
    );
  }

  return <div className="app-shell">{page}</div>;
}

export default AppContent;
