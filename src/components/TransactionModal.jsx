import { X } from "lucide-react";

function TransactionModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isEditing,
}) {
  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="transaction-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>
              {isEditing ? "Edit Transaction" : "Add Transaction"}
            </h2>

            <p>
              {isEditing
                ? "Update your transaction details"
                : "Add a new financial transaction"}
            </p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit}>

          <div className="form-group">
            <label>Title</label>

            <input
              type="text"
              name="title"
              placeholder="e.g. Restaurant"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Amount</label>

            <input
              type="number"
              name="amount"
              placeholder="e.g. 500"
              value={formData.amount}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Transport">Transport</option>
                <option value="Work">Work</option>
                <option value="Technology">Technology</option>
              </select>
            </div>

          </div>

          <div className="form-group">
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
            >
              {isEditing ? "Update Transaction" : "Add Transaction"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default TransactionModal;

