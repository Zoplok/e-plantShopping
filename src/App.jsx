import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import AboutUs from "./components/AboutUs.jsx";
import CartItem from "./components/CartItem.jsx";
import ProductList from "./components/ProductList.jsx";

function CartSvg() {
  return (
    <svg className="cart-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44A1 1 0 0 0 9.13 17H19v-2H9.42a.25.25 0 0 1-.22-.37L10.1 13h7.45a2 2 0 0 0 1.79-1.11L23 6H6.42l-.94-2zM9 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    </svg>
  );
}

function Navbar({ currentView, onNavigate, cartCount }) {
  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar-brand">Paradise Nursery</div>
      <div className="navbar-links">
        <button
          type="button"
          className={`nav-link ${currentView === "landing" ? "active" : ""}`}
          onClick={() => onNavigate("landing")}
        >
          Home
        </button>
        <button
          type="button"
          className={`nav-link ${currentView === "products" ? "active" : ""}`}
          onClick={() => onNavigate("products")}
        >
          Plants
        </button>
        <button
          type="button"
          className={`nav-link ${currentView === "cart" ? "active" : ""}`}
          onClick={() => onNavigate("cart")}
        >
          <span className="cart-pill">
            <CartSvg />
            <span>{cartCount}</span>
          </span>
        </button>
      </div>
    </nav>
  );
}

function LandingPage({ onGetStarted }) {
  return (
    <section className="landing-page">
      <div className="landing-hero">
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
  const [currentView, setCurrentView] = useState("landing");
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  let page = <LandingPage onGetStarted={() => setCurrentView("products")} />;

  if (currentView === "products") {
    page = <ProductList />;
  }

  if (currentView === "cart") {
    page = <CartItem onContinueShopping={() => setCurrentView("products")} />;
  }

  return (
    <div className="app-shell">
      {currentView !== "landing" ? (
        <Navbar
          currentView={currentView}
          onNavigate={setCurrentView}
          cartCount={cartCount}
        />
      ) : null}
      {page}
    </div>
  );
}

export default AppContent;

