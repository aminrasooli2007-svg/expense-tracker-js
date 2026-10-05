
import {
  Wallet,
  ArrowDownToLine,
  ArrowUpToLine,
  List,
} from "lucide-react";

function SummaryCard({
  title,
  amount,
  type,
  currency,
}) {
  let Icon = Wallet;

  if (type === "income") {
    Icon = ArrowDownToLine;
  }

  if (type === "expense") {
    Icon = ArrowUpToLine;
  }

  if (type === "transaction") {
    Icon = List;
  }

  return (
    <div className="summary-card">
      <div className="summary-top">
        <div className={`summary-icon ${type}-icon`}>
          <Icon size={20} />
        </div>

        <span className="card-label">
          {title}
        </span>
      </div>

      <h2>
        {amount.toLocaleString()}
        {type !== "transaction" && ` ${currency}`}
      </h2>

      <span className="card-description">
        {type === "balance" && "Available balance"}
        {type === "income" && "Total money received"}
        {type === "expense" && "Total money spent"}
        {type === "transaction" && "All transactions"}
      </span>
    </div>
  );
}

export default SummaryCard;

