import {
  Utensils,
  BriefcaseBusiness,
  Car,
  ShoppingCart,
  Laptop,
  Trash2,
  Pencil,
} from "lucide-react";

function TransactionRow({
  id,
  title,
  category,
  date,
  amount,
  type,
  onDelete,
  onEdit,
}) {
  const categoryIcons = {
    Food: Utensils,
    Shopping: ShoppingCart,
    Transport: Car,
    Work: BriefcaseBusiness,
    Technology: Laptop,
  };

  const Icon = categoryIcons[category];

  return (
    <div className="transaction-row">

      <div className="transaction-name">
        <div className="transaction-icon expense">
          <Icon size={18} />
        </div>

        <strong>{title}</strong>
      </div>

      <span className="category-name">
        {category}
      </span>

      <span className="transaction-date">
        {date}
      </span>

      <span className={`transaction-amount ${type}`}>
        {type === "income" ? "+" : "-"} {amount}
      </span>

      <div className="transaction-actions">

        <button
          className="edit-button"
          onClick={() => onEdit(id)}
          title="Edit transaction"
        >
          <Pencil size={16} />
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(id)}
          title="Delete transaction"
        >
          <Trash2 size={17} />
        </button>

      </div>

    </div>
  );
}

export default TransactionRow;