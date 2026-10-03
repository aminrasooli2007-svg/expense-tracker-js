
import TransactionRow from "./TransactionRow";
function RecentTransactions({transactions , deleteTransaction ,addTransaction}) {
  
  return (
    <div className="content-card transactions-card">
      <div className="card-header">
        <div>
          <h3>Recent Transactions</h3>
          <p>Your latest financial activity</p>
        </div>

        <button className="view-all" onClick={addTransaction}>
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

        {
          transactions.map((item) => {
            return <TransactionRow key={item.id}
             id={item.id}
              title={item.title}
               category={item.category}
                date={item.date}
                 amount={item.amount} 
                 type={item.type}
                 onDelete={()=>deleteTransaction(item.id)}
                 />
          })
        }
      </div>
    </div>
  );
}

export default RecentTransactions;