function CategoryItem() {
  return (
    <div className="category-item">
      <div className="category-left">
        <div className="category-dot"></div>

        <div>
          <strong>Food</strong>
          <span>1,850 AFN</span>
        </div>
      </div>

      <span className="category-percentage">
        32%
      </span>
    </div>
  );
}

export default CategoryItem;