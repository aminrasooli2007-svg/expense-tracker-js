import { Search, SlidersHorizontal } from "lucide-react";

function TransactionToolbar({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="transaction-toolbar">

      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-group">

        <div className="filter-select">
          <SlidersHorizontal size={17} />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <select
          className="category-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Transport">Transport</option>
          <option value="Work">Work</option>
          <option value="Technology">Technology</option>
        </select>

      </div>

    </div>
  );
}

export default TransactionToolbar;