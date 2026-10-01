import {
  Utensils,
  BriefcaseBusiness,
  Car,
  ShoppingCart,
  Laptop,
} from "lucide-react";

function TransactionRow() {
  return (
    <div className="transaction-row">
      <div className="transaction-name">
        <div className="transaction-icon expense">
          <Utensils size={18} />
        </div>

        <strong>Restaurant</strong>
      </div>

      <span className="category-name">
        Food
      </span>

      <span className="transaction-date">
        Sep 30, 2026
      </span>

      <span className="transaction-amount expense">
        - 450 AFN
      </span>
    </div>
  );
}

export default TransactionRow;