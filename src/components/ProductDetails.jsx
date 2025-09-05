import { useProduct } from "../context/ProductContext";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { selectedProduct } = useProduct();

  if (!selectedProduct) {
    return null;
  }

  return (
    <div className="product-details-section">
      <div className="details-container">
        {/* Left Column */}
        <div className="details-column">
          <div className="detail-row">
            <span className="detail-label">PurRate:</span>
            <span className="detail-value">
              {selectedProduct.purRate || ""}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Cost:</span>
            <span className="detail-value">{selectedProduct.cost || ""}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Margin%:</span>
            <span className="detail-value">{selectedProduct.margin || ""}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">W/oDeal:</span>
            <span className="detail-value">{selectedProduct.woDeal || ""}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Margin%:</span>
            <span className="detail-value">
              {selectedProduct.margin2 || ""}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">PurDeal:</span>
            <span className="detail-value">
              {selectedProduct.purDeal || ""}
            </span>
          </div>
        </div>

        {/* Middle Column */}
        <div className="details-column">
          <div className="detail-row">
            <span className="detail-label">M.R.P.:</span>
            <span className="detail-value">{selectedProduct.mrp || ""}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Rate:</span>
            <span className="detail-value">{selectedProduct.rate || ""}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Tax-T:</span>
            <span className="detail-value">{selectedProduct.taxT || ""}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">CESS:</span>
            <span className="detail-value">{selectedProduct.cess || ""}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">F.Rate:</span>
            <span className="detail-value">{selectedProduct.fRate || ""}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Excise:</span>
            <span className="detail-value">{selectedProduct.excise || ""}</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="details-column">
          <div className="detail-row">
            <span className="detail-label">Company:</span>
            <span className="detail-value">
              {selectedProduct.company || ""}
            </span>
            <div className="browser-icon">🌐</div>
          </div>
          <div className="detail-row">
            <span className="detail-label">Salt:</span>
            <span className="detail-value">{selectedProduct.salt || ""}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">HSN/SAC:</span>
            <span className="detail-value">{selectedProduct.hsn || ""}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Mfr.:</span>
            <span className="detail-value">{selectedProduct.mfr || ""}</span>
          </div>
          <div className="detail-row-flex">
            <div className="detail-item">
              <span className="detail-label">Conv.:</span>
              <span className="detail-value">{selectedProduct.conv || ""}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Box:</span>
              <span className="detail-value">{selectedProduct.box || ""}</span>
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-label">PRINT N:</span>
            <span className="detail-value"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
