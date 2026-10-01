import { Plus } from "lucide-react";

function QuickAdd() {
  return (
    <div className="content-card quick-add">
      <div className="card-header">
        <div>
          <h3>Quick Add</h3>
          <p>Add a new transaction</p>
        </div>
      </div>

      <button className="quick-add-button">
        <Plus size={19} />
        Add Transaction
      </button>
    </div>
  );
}

export default QuickAdd;