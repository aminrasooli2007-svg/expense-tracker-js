import { Bell, Plus } from "lucide-react";

function Topbar({ onAdd, name }) {
  return (
    <header className="topbar">
      <div>
        <p className="welcome">
          Welcome back, {name} 👋
        </p>

        <h1>Dashboard</h1>
      </div>

      <div className="topbar-actions">
        <button className="icon-button">
          <Bell size={19} />
        </button>

        <button
          className="add-button"
          onClick={onAdd}
        >
          <Plus size={18} />
          <span>Add Transaction</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;