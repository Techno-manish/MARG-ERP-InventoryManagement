import React, { createContext, useContext, useState, useEffect } from "react";
import { initialProducts } from "../data/dummyData.js";

// Create context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(initialProducts[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create"); // 'create' | 'modify'
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(true);

  // 🔹 Filter products based on search term
  useEffect(() => {
    let filtered;
    if (searchTerm.trim() === "") {
      filtered = products;
    } else {
      filtered = products.filter((product) =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setSelectedIndex(0);
    setSelectedProduct(filtered[0] || null);
  }, [searchTerm, products]);

  // 🔹 Keep selectedProduct in sync with selectedIndex
  useEffect(() => {
    if (filteredProducts.length > 0 && selectedIndex >= 0) {
      setSelectedProduct(filteredProducts[selectedIndex]);
    } else {
      setSelectedProduct(null);
    }
  }, [selectedIndex, filteredProducts]);

  // 🔹 Scroll selected row into view
  useEffect(() => {
    if (filteredProducts.length === 0) return;

    const row = document.querySelector(
      `.product-table tbody tr[data-index="${selectedIndex}"]`
    );

    if (row) {
      row.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex, filteredProducts]);

  // 🔹 Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isModalOpen) return;

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;

        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, filteredProducts.length - 1)
          );
          break;

        case "F2":
          event.preventDefault();
          openModal("create");
          break;

        case "F3":
          event.preventDefault();
          openModal("modify");
          break;

        case "Delete":
          event.preventDefault();
          if (filteredProducts[selectedIndex]) {
            deleteProduct(filteredProducts[selectedIndex].id);
          }
          break;

        case "F1":
          event.preventDefault();
          setIsKeyboardModalOpen(true);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredProducts, selectedIndex, isModalOpen]);

  // 🔹 Helpers
  const selectProduct = (product, index) => {
    setSelectedProduct(product);
    setSelectedIndex(index);
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("create");
  };

  const closeKeyboardModal = () => {
    setIsKeyboardModalOpen(false);
  };

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map((p) => p.id)) + 1,
    };
    setProducts([...products, newProduct]);
    closeModal();
  };

  const updateProduct = (productData) => {
    setProducts(
      products.map((p) =>
        p.id === selectedProduct.id
          ? { ...productData, id: selectedProduct.id }
          : p
      )
    );
    setSelectedProduct({ ...productData, id: selectedProduct.id });
    closeModal();
  };

  const deleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((p) => p.id !== productId);
      setProducts(updatedProducts);

      if (updatedProducts.length > 0) {
        const newIndex = Math.min(selectedIndex, updatedProducts.length - 1);
        setSelectedIndex(newIndex);
        setSelectedProduct(updatedProducts[newIndex]);
      } else {
        setSelectedIndex(0);
        setSelectedProduct(null);
      }
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // 🔹 Context value
  const value = {
    products,
    filteredProducts,
    selectedProduct,
    selectedIndex,
    searchTerm,
    isModalOpen,
    modalType,
    isKeyboardModalOpen,
    selectProduct,
    openModal,
    closeModal,
    closeKeyboardModal,
    addProduct,
    updateProduct,
    deleteProduct,
    handleSearch,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

// Custom hook
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
