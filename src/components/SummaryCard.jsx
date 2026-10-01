import { Wallet } from "lucide-react";

function SummaryCard() {
  return (
    <div className="summary-card">
      <div className="summary-top">
        <div className="summary-icon balance-icon">
          <Wallet size={20} />
        </div>

        <span className="card-label">
          Total Balance
        </span>
      </div>

      <h2>24,200 AFN</h2>

      <span className="card-description">
        Available balance
      </span>
    </div>
  );
}

export default SummaryCard;