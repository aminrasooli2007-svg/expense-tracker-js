import TransactionRow from "./TransactionRow";

function RecentTransactions() {
  const transactions = [
  {
    id: 1,
    title: "Restaurant",
    category: "Food",
    date: "Sep 30, 2026",
    amount: 450,
    type: "expense",
  },
  {
    id: 2,
    title: "Freelance Work",
    category: "Work",
    date: "Sep 29, 2026",
    amount: 5000,
    type: "income",
  },
  {
    id: 3,
    title: "ُShopping",
    category: "Shopping",
    date: "Sep 29, 2026",
    amount: 400,
    type: "expense",
  },
];
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

      {
        transactions.map((item)=>{
          return <TransactionRow key={item.id} id={item.id} title={item.title} category={item.category} date={item.date} amount={item.amount} type={item.type} /> 
        })
      }
        
      </div>
    </div>
  );
}

export default RecentTransactions;