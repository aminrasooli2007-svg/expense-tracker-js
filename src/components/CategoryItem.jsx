
function CategoryItem({
  category,
  amount,
  percentage,
  currency,
}) {
  return (
    <div className="category-item">
      <div className="category-left">
        <div className="category-dot"></div>

        <div>
          <strong>{category}</strong>

          <span>
            {amount.toLocaleString()} {currency}
          </span>
        </div>
      </div>

      <span className="category-percentage">
        {Math.round(percentage)}%
      </span>
    </div>
  );
}

export default CategoryItem;

