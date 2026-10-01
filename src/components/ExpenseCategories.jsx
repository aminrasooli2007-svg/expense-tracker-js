import CategoryItem from "./CategoryItem";

function ExpenseCategories() {
  return (
    <div className="content-card categories-card">
      <div className="card-header">
        <div>
          <h3>Expenses by Category</h3>
          <p>This month's expenses</p>
        </div>
      </div>

      <div className="categories-list">
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </div>
    </div>
  );
}

export default ExpenseCategories;