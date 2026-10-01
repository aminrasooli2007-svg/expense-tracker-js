import { Bell, Plus } from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">
      <div>
        <p className="welcome">
          Welcome back, Amin 👋
        </p>

        <h1>Dashboard</h1>
      </div>

      <div className="topbar-actions">
        <button className="icon-button">
          <Bell size={19} />
        </button>

        <button className="add-button">
          <Plus size={18} />
          <span>Add Transaction</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;