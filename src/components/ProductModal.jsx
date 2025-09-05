import React, { useState, useEffect, useRef } from "react";
import { useProduct } from "../context/ProductContext";
import "../styles/ProductModal.css";

const ProductModal = () => {
  const {
    isModalOpen,
    modalType,
    selectedProduct,
    closeModal,
    addProduct,
    updateProduct,
  } = useProduct();

  const [formData, setFormData] = useState({
    status: "CONTINUE",
    type: "NORMAL",
    hide: "NO",
    code: "",
    description: "",
    packing: "",
    decimal: "Yes",
    unit1st: "Pcs",
    unit2nd: "Case",
    colorType: "NORMAL",
    itemType: "1 NORMAL",
    company: "E.MERK PVT.LTD.",
    salt: "OTHERS",
    hsn: "12345678",
    local: "Taxable",
    central: "Taxable",
    sgst: "6.00",
    igst: "12.00",
    gst: "6.00",
    cess1: "0.00",
    cess2: "0.00",
    mrp: "0.00",
    rateA: "0.00",
    conversion: "0.000",
    pRate: "0.00",
    rateB: "0.00",
    boxQty: "0.000",
    rateC: "0.00",
    cost: "0.00000",
    negative: "No",
    minimumQty: "0",
    maximumQty: "0",
    reorderQty: "0",
    days: "0",
    volumeDiscount: "0.000",
    onQty: "0.0",
    discount: "Applicable",
    itemDiscount: "0.00",
    specialDiscount: "0.00",
    purchaseDisc: "0.00",
    f6RateEffect: "YES",
    freeScheme: "0+",
    validFrom: "Full Scheme",
    discountLess: "0.00",
    mfrName: "",
    narcotic: "No",
    scheduleH: "No",
    scheduleHi: "No",
    batchwiseStock: "YES",
  });

  const modalRef = useRef();

  useEffect(() => {
    if (modalType === "modify" && selectedProduct) {
      setFormData({
        ...formData,
        code: selectedProduct.code || "",
        description: selectedProduct.description || "",
        packing: selectedProduct.packing || "",
        company: selectedProduct.company || "",
        salt: selectedProduct.salt || "",
        hsn: selectedProduct.hsn || "",
        mrp: selectedProduct.mrp || "0.00",
        rateA: selectedProduct.rateA || "0.00",
        pRate: selectedProduct.purRate || "0.00",
        cost: selectedProduct.cost || "0.00000",
      });
    } else {
      setFormData({
        ...formData,
        code: "0000",
      });
    }
  }, [modalType, selectedProduct, isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      description: formData.description,
      packing: formData.packing,
      stockUnit: "- Pcs",
      rateA: formData.rateA,
      purRate: formData.pRate,
      cost: formData.cost,
      mrp: formData.mrp,
      rate: formData.rateA,
      taxT: "12.00",
      fRate: (parseFloat(formData.rateA) * 1.12).toFixed(2),
      company: formData.company,
      salt: formData.salt,
      hsn: formData.hsn,
      conv: "0",
      box: "0",
      code: formData.code,
    };

    if (modalType === "create") {
      addProduct(productData);
    } else {
      updateProduct(productData);
    }
  };

  if (!isModalOpen) {
    return null;
  }

  const onCloseModal = (e) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  return (
    <div ref={modalRef} onClick={onCloseModal} className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{modalType === "create" ? "NEW PRODUCT" : "MODIFY PRODUCT"}</h2>
          <button className="close-button" onClick={closeModal}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {/* Top row - STATUS, TYPE, HIDE */}
          <div className="top-row">
            <div className="form-group status-tr">
              <label>STATUS : </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="status-field"
              >
                <option value="CONTINUE">CONTINUE</option>
                <option value="DISCONTINUE">DISCONTINUE</option>
              </select>
            </div>
            <div className="form-group">
              <label>TYPE :</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="type-field"
              >
                <option value="NORMAL">NORMAL</option>
                <option value="SPECIAL">SPECIAL</option>
              </select>
            </div>
            <div className="form-group">
              <label>HIDE :</label>
              <select
                name="hide"
                value={formData.hide}
                onChange={handleInputChange}
                className="hide-field"
              >
                <option value="NO">NO</option>
                <option value="YES">YES</option>
              </select>
            </div>
          </div>

          {/* Product row - CODE, PRODUCT, PACKING */}
          <div className="product-row">
            <div className="form-group">
              <label>CODE :</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="code-field"
              />
            </div>
            <div className="form-group">
              <label>PRODUCT :</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="product-field"
              />
            </div>
            <div className="form-group">
              <label>PACKING :</label>
              <input
                type="text"
                name="packing"
                value={formData.packing}
                onChange={handleInputChange}
                className="packing-field"
              />
            </div>
          </div>

          {/* Units row */}
          <div className="units-row">
            <div className="form-group">
              <label>UNIT 1st :</label>
              <input
                type="text"
                name="unit1st"
                value={formData.unit1st}
                onChange={handleInputChange}
                className="unit-field"
              />
            </div>
            <div className="form-group">
              <label>UNIT 2nd:</label>
              <input
                type="text"
                name="unit2nd"
                value={formData.unit2nd}
                onChange={handleInputChange}
                className="unit-field"
              />
            </div>
            <div className="form-group">
              <label>DECIMAL :</label>
              <select
                name="decimal"
                value={formData.decimal}
                onChange={handleInputChange}
                className="decimal-field"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="units-row">
            <div className="form-group">
              <label>FAST SEARCH:</label>
              <input
                type="text"
                name="fastSearch"
                value={formData.fastSearch || ""}
                onChange={handleInputChange}
                className="fast-search-field"
              />
            </div>
          </div>

          {/* Types row */}
          <div className="types-row">
            <div className="form-group">
              <label>COLOR TYPE :</label>
              <select
                name="colorType"
                value={formData.colorType}
                onChange={handleInputChange}
                className="color-field"
              >
                <option value="NORMAL">NORMAL</option>
              </select>
            </div>
            <div className="form-group">
              <label>ITEM TYPE :</label>
              <select
                name="itemType"
                value={formData.itemType}
                onChange={handleInputChange}
                className="item-field"
              >
                <option value="1 NORMAL">1 NORMAL</option>
              </select>
            </div>
          </div>

          {/* Company row */}
          <div className="toggle-row">
            <div className="form-group">
              <label>COMPANY :</label>
              <select className="toggle-field">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="company-field large-input"
              />
            </div>
          </div>

          {/* Salt row */}
          <div className="toggle-row">
            <div className="form-group">
              <label>SALT :</label>
              <select className="toggle-field">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <input
                type="text"
                name="salt"
                value={formData.salt}
                onChange={handleInputChange}
                className="salt-field large-input"
              />
            </div>
          </div>

          {/* HSN row */}
          <div className="toggle-row">
            <div className="form-group">
              <label>HSN/SAC :</label>
              <select className="toggle-field">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <input
                type="text"
                name="hsn"
                value={formData.hsn}
                onChange={handleInputChange}
                className="hsn-field mid-input"
              />
            </div>
          </div>

          {/* Tax Section */}
          <div className="tax-section">
            <div className="tax-row">
              <div className="form-group">
                <label>LOCAL :</label>
                <select
                  name="local"
                  value={formData.local}
                  onChange={handleInputChange}
                  className="tax-field"
                >
                  <option value="Taxable">Taxable</option>
                  <option value="Non-Taxable">Non-Taxable</option>
                </select>
              </div>
              <div className="form-group">
                <label>SGST % :</label>
                <input
                  type="text"
                  name="sgst"
                  value={formData.sgst}
                  onChange={handleInputChange}
                  className="percent-field"
                />
              </div>
              <div className="form-group">
                <label>GST % :</label>
                <input
                  type="text"
                  name="gst"
                  value={formData.gst}
                  onChange={handleInputChange}
                  className="percent-field"
                />
              </div>
            </div>
            <div className="tax-row">
              <div className="form-group">
                <label>CENTRAL :</label>
                <select
                  name="central"
                  value={formData.central}
                  onChange={handleInputChange}
                  className="tax-field"
                >
                  <option value="Taxable">Taxable</option>
                  <option value="Non-Taxable">Non-Taxable</option>
                </select>
              </div>
              <div className="form-group">
                <label>IGST % :</label>
                <input
                  type="text"
                  name="igst"
                  value={formData.igst}
                  onChange={handleInputChange}
                  className="percent-field"
                />
              </div>
              <div className="form-group">
                <label>CESS % :</label>
                <div className="cess-container">
                  <input
                    type="text"
                    name="cess1"
                    value={formData.cess1}
                    onChange={handleInputChange}
                    className="percent-field"
                  />
                  <span className="cess-plus">+</span>
                  <input
                    type="text"
                    name="cess2"
                    value={formData.cess2}
                    onChange={handleInputChange}
                    className="percent-field"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section - Two Columns */}
          <div className="pricing-section">
            {/* Left Column */}
            <div className="pricing-left">
              <div className="form-row">
                <div className="form-group">
                  <label>M.R.P. :</label>
                  <input
                    type="text"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleInputChange}
                    className="price-field"
                  />
                </div>
                <div className="form-group">
                  <label>P.RATE :</label>
                  <input
                    type="text"
                    name="pRate"
                    value={formData.pRate}
                    onChange={handleInputChange}
                    className="price-field"
                  />
                </div>
                <div className="form-group">
                  <label>COST/ :</label>
                  <input
                    type="text"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    className="price-field"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Rate-A :</label>
                  <input
                    type="text"
                    name="rateA"
                    value={formData.rateA}
                    onChange={handleInputChange}
                    className="price-field"
                  />
                </div>
                <div className="form-group">
                  <label>Rate-B :</label>
                  <input
                    type="text"
                    name="rateB"
                    value={formData.rateB}
                    onChange={handleInputChange}
                    className="price-field"
                  />
                </div>
                <div className="form-group">
                  <label>Rate-C :</label>
                  <input
                    type="text"
                    name="rateC"
                    value={formData.rateC}
                    onChange={handleInputChange}
                    className="price-field"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>CONVERSION :</label>
                  <input
                    type="text"
                    name="conversion"
                    value={formData.conversion}
                    onChange={handleInputChange}
                    className="price-field"
                  />
                </div>
                <div className="form-group">
                  <label>BOX QTY. :</label>
                  <input
                    type="text"
                    name="boxQty"
                    value={formData.boxQty}
                    onChange={handleInputChange}
                    className="price-field"
                  />
                </div>
                <div className="form-group">
                  <label>NEGATIVE :</label>
                  <select
                    name="negative"
                    value={formData.negative}
                    onChange={handleInputChange}
                    className="schedule-field"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>MINIMUM QTY. :</label>
                  <input
                    type="text"
                    name="minimumQty"
                    value={formData.minimumQty}
                    onChange={handleInputChange}
                    className="qty-field"
                  />
                </div>
                <div className="form-group">
                  <label>MAXIMUM QTY :</label>
                  <input
                    type="text"
                    name="maximumQty"
                    value={formData.maximumQty}
                    onChange={handleInputChange}
                    className="qty-field"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>VOLUME DISCOUNT :</label>
                  <input
                    type="text"
                    name="volumeDiscount"
                    value={formData.volumeDiscount}
                    onChange={handleInputChange}
                    className="price-field"
                  />
                </div>
                <div className="form-group">
                  <label>On Qty. :</label>
                  <input
                    type="text"
                    name="onQty"
                    value={formData.onQty}
                    onChange={handleInputChange}
                    className="qty-field"
                  />
                </div>
                <div className="form-group">
                  <label>DISCOUNT :</label>
                  <select
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="tax-field"
                  >
                    <option value="Applicable">Applicable</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="pricing-right">
              <div className="form-row">
                <div className="form-group no-gap">
                  <label>REORDER QTY. :</label>
                  <input
                    type="text"
                    name="reorderQty"
                    value={formData.reorderQty}
                    onChange={handleInputChange}
                    className="qty-field small-input"
                  />
                  <label>DAYS:</label>
                  <input
                    type="text"
                    name="days"
                    value={formData.days}
                    onChange={handleInputChange}
                    className="qty-field small-input"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>ON QUANTITY :</label>
                  <input
                    type="text"
                    name="onQty"
                    value={formData.onQty}
                    onChange={handleInputChange}
                    className="price-field"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>F6/Rate ± Effect :</label>
                  <select
                    name="f6RateEffect"
                    value={formData.f6RateEffect}
                    onChange={handleInputChange}
                    className="schedule-field"
                  >
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group scheme-container">
                  <label>FREE SCHEME &lt;M&gt; :</label>
                  <input
                    type="text"
                    name="freeScheme"
                    value={formData.freeScheme}
                    onChange={handleInputChange}
                    className="scheme-field"
                  />
                </div>
              </div>
              <div>
                <span className="divider">------TO-----</span>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>MFR. NAME :</label>
                  <input
                    type="text"
                    name="mfrName"
                    value={formData.mfrName}
                    onChange={handleInputChange}
                    className="company-field"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>SCHEDULE HI :</label>
                  <select
                    name="scheduleHi"
                    value={formData.scheduleHi}
                    onChange={handleInputChange}
                    className="schedule-field"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bottom-section">
            <div className="bottom-row">
              <div className="form-group">
                <label>ITEM DISCOUNT :</label>
                <input
                  type="text"
                  name="itemDiscount"
                  value={formData.itemDiscount}
                  onChange={handleInputChange}
                  className="discount-field"
                />
              </div>
              <div className="form-group">
                <label>SPECIAL DISCOUNT :</label>
                <input
                  type="text"
                  name="specialDiscount"
                  value={formData.specialDiscount}
                  onChange={handleInputChange}
                  className="discount-field"
                />
              </div>
              <div className="form-group">
                <label>Purchase Disc. :</label>
                <input
                  type="text"
                  name="purchaseDisc"
                  value={formData.purchaseDisc}
                  onChange={handleInputChange}
                  className="discount-field"
                />
              </div>
            </div>
            <div className="bottom-row">
              <div className="form-group">
                <label>MAXIMUM DISCOUNT %: </label>
                <input
                  type="text"
                  name="maximumDiscount"
                  value={formData.maximumDiscount || "0.00"}
                  onChange={handleInputChange}
                  className="discount-field"
                />
              </div>
              <div className="form-group">
                <label>VALID FROM :</label>
                <select
                  name="validFrom"
                  value={formData.validFrom}
                  onChange={handleInputChange}
                  className="tax-field"
                >
                  <option value="Full Scheme">Full Scheme</option>
                </select>
              </div>
            </div>
            <div className="bottom-row">
              <div className="form-group">
                <label>MINIMUM MARGIN % :</label>
                <input
                  type="text"
                  name="minimumMargin"
                  value={formData.minimumMargin}
                  onChange={handleInputChange}
                  className="margin-field"
                />
              </div>
              <div className="form-group">
                <label>DISCOUNT LESS :</label>
                <input
                  type="text"
                  name="discountLess"
                  value={formData.discountLess}
                  onChange={handleInputChange}
                  className="discount-field"
                />
              </div>
              <div className="form-group">
                <label>SCHEDULE H :</label>
                <select
                  name="scheduleH"
                  value={formData.scheduleH}
                  onChange={handleInputChange}
                  className="schedule-field"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
            <div className="bottom-row">
              <div className="form-group">
                <label>NARCOTIC :</label>
                <select
                  name="narcotic"
                  value={formData.narcotic}
                  onChange={handleInputChange}
                  className="schedule-field"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label>BATCH WISE STOCK :</label>
                <select
                  name="batchwiseStock"
                  value={formData.batchwiseStock}
                  onChange={handleInputChange}
                  className="batch-field"
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button type="submit" className="save-button">
              {modalType === "create" ? "Save" : "Update"}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
