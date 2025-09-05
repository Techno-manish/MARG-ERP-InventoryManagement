import ProductTable from "../components/ProductTable";
import ProductDetails from "../components/ProductDetails";
import ProductModal from "../components/ProductModal";
import KeyboardModal from "../components/KeyboardModal";
import Timer from "../components/Timer";

import "../styles/Inventory.css";

const Inventory = () => {
  return (
    <div className="marg-erp-container">
      {/* Header */}
      <header className="main-header">
        <div className="header-left">
          <h1>ITEMS</h1>
        </div>
        <div className="header-right">
          <Timer />
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Product Table */}
        <ProductTable />

        {/* Product Details */}
        <ProductDetails />
      </main>

      {/* Modals */}
      <ProductModal />
      <KeyboardModal />
    </div>
  );
};

export default Inventory;
