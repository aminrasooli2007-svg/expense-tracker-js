
import TransactionRow from "./TransactionRow";
import TransactionToolbar from "./TransactionToolbar";

function RecentTransactions({
  transactions,
  deleteTransaction,
  editTransaction,
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
  currency,
}) {
  return (
    <div className="content-card transactions-card">
      <div className="card-header">
        <div>
          <h3>Recent Transactions</h3>
          <p>Your latest financial activity</p>
        </div>
      </div>

      <TransactionToolbar
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <div className="transaction-table">
        <div className="table-head">
          <span>Transaction</span>
          <span>Category</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Actions</span>
        </div>

        {transactions.length > 0 ? (
          transactions.map((item) => {
            return (
              <TransactionRow
                key={item.id}
                id={item.id}
                title={item.title}
                category={item.category}
                date={item.date}
                amount={item.amount}
                type={item.type}
                currency={currency}
                onDelete={() =>
                  deleteTransaction(item.id)
                }
                onEdit={() =>
                  editTransaction(item.id)
                }
              />
            );
          })
        ) : (
          <div className="empty-transactions">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentTransactions;

