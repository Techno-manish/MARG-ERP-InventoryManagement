import { useProduct } from "../context/ProductContext";
import "../styles/ProductTable.css";

const ProductTable = () => {
  const {
    filteredProducts,
    selectedProduct,
    selectProduct,
    handleSearch,
    searchTerm,
  } = useProduct();

  const handleRowClick = (product, index) => {
    selectProduct(product, index);
  };

  const handleSearchChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>DESCRIPTION</th>
            <th>PACKING</th>
            <th>STOCK UNIT</th>
            <th>RATE-A</th>
          </tr>
        </thead>
      </table>

      <div className="product-table-body">
        <table className="product-table">
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr
                key={product.id}
                data-id={product.id} // for querying by ID if needed
                data-index={index} // for scrollIntoView effect
                tabIndex={-1} // makes row focusable without messing tab order
                className={
                  selectedProduct?.id === product.id
                    ? "selected"
                    : index % 2 === 0
                    ? "even"
                    : "odd"
                }
                onClick={() => handleRowClick(product, index)}
              >
                <td>{product.description}</td>
                <td>{product.packing}</td>
                <td>{product.stockUnit}</td>
                <td>{product.rateA}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="search-section">
        <span className="search-label">Find Name ? &gt;&gt;</span>
        <span className="search-input-wrapper">
          <span className="search-bracket">[</span>
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
            autoComplete="off"
          />
          <span className="search-bracket">]</span>
        </span>
      </div>
    </div>
  );
};

export default ProductTable;
