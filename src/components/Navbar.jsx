export default function Navbar({ currentView, onNavigate, cartCount }) {
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
            <svg className="cart-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44A1 1 0 0 0 9.13 17H19v-2H9.42a.25.25 0 0 1-.22-.37L10.1 13h7.45a2 2 0 0 0 1.79-1.11L23 6H6.42l-.94-2zM9 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
            <span>{cartCount}</span>
          </span>
        </button>
      </div>
    </nav>
  );
}

