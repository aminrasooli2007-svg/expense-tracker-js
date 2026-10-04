import { AlertTriangle, X } from "lucide-react";

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  transaction,
}) {
  if (!isOpen || !transaction) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="delete-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="delete-icon">
          <AlertTriangle size={24} />
        </div>

        <h2>Delete Transaction?</h2>

        <p>
          Are you sure you want to delete
          <strong> "{transaction.title}" </strong>?
          This action cannot be undone.
        </p>

        <div className="delete-actions">

          <button
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="confirm-delete-button"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteModal;