import {
  Utensils,
  BriefcaseBusiness,
  Car,
  ShoppingCart,
  Laptop,
} from "lucide-react";

function TransactionRow({id , title , category , date ,amount , type}) {
  const categoryIcons = {
  Food: Utensils,
  Shopping: ShoppingCart,
  Transport: Car,
  Work: BriefcaseBusiness,
  Technology: Laptop,
};

const Icon = categoryIcons[category]
  return (
    <div className="transaction-row">
      <div className="transaction-name">
        <div className="transaction-icon expense">
          <Icon  size={18} />
        </div>

        <strong>{title}</strong>
      </div>

      <span  className="category-name">
        {category}
      </span>

      <span className="transaction-date">
        {date} 
      </span>

      <span  className={`transaction-amount ${type}` }>
       {type === "income" ? '+' : '-'}  {amount}
      </span>
    </div>
  );
}

export default TransactionRow;