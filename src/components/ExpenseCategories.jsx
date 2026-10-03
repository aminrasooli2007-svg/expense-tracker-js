import CategoryItem from "./CategoryItem";

function ExpenseCategories({ transactions, totalExpenses }) {

  const expenses = transactions.filter((transaction) => {
    return transaction.type === "expense";
  });

  const categoryTotals = expenses.reduce((acc, transaction) => {
    acc[transaction.category] =
      (acc[transaction.category] || 0) + transaction.amount;

    return acc;
  }, {});
  return (
    <div className="content-card categories-card">
      <div className="card-header">
        <div>
          <h3>Expenses by Category</h3>
          <p>This month's expenses</p>
        </div>
      </div>

      <div className="categories-list">
        {Object.entries(categoryTotals).map(([category, amount]) => {
        const percentage = (amount / totalExpenses) * 100; 
        return (
        <CategoryItem 
        key={category} 
        category={category} 
        amount={amount} 
        percentage={percentage} 
        />)})}
      </div>
    </div>
  );
}

export default ExpenseCategories;