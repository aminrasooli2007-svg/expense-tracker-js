import TransactionRow from "./TransactionRow";

function RecentTransactions() {
  return (
    <div className="content-card transactions-card">
      <div className="card-header">
        <div>
          <h3>Recent Transactions</h3>
          <p>Your latest financial activity</p>
        </div>

        <button className="view-all">
          View all
        </button>
      </div>

      <div className="transaction-table">
        <div className="table-head">
          <span>Transaction</span>
          <span>Category</span>
          <span>Date</span>
          <span>Amount</span>
        </div>

        <TransactionRow />
        <TransactionRow />
        <TransactionRow />
        <TransactionRow />
        <TransactionRow />
      </div>
    </div>
  );
}

export default RecentTransactions;