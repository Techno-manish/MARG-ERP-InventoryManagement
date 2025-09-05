import { useProduct } from "../context/ProductContext";
import "../styles/KeyboardModal.css";

const KeyboardModal = () => {
  const { isKeyboardModalOpen, closeKeyboardModal } = useProduct();

  if (!isKeyboardModalOpen) {
    return null;
  }

  return (
    <div className="keyboard-modal-overlay">
      <div className="keyboard-modal-content">
        <div className="keyboard-modal-message">
          Please use keys...F1-Instructions F2-Create New F3-Modify Del-Delete
        </div>
        <button className="keyboard-modal-close" onClick={closeKeyboardModal}>
          ×
        </button>
      </div>
    </div>
  );
};

export default KeyboardModal;
