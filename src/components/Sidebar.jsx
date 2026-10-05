import {
  LayoutDashboard,
  ArrowLeftRight,
  ChartPie,
  Settings,
  Wallet,
  LogOut,
} from "lucide-react";

function Sidebar({
  activePage,
  setActivePage,
  name,
  onLogout,
}) {
  const handleNavigation = (page) => {
    setActivePage(page);
  };

  const initials = name
    ? name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "AR";

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <Wallet size={21} />
        </div>

        <span>ExpenseFlow</span>
      </div>

      <nav className="nav">
        <p className="nav-title">
          MAIN MENU
        </p>

        <button
          className={`nav-item ${
            activePage === "dashboard"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("dashboard")
          }
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button
          className={`nav-item ${
            activePage === "transactions"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("transactions")
          }
        >
          <ArrowLeftRight size={18} />
          <span>Transactions</span>
        </button>

        <button
          className={`nav-item ${
            activePage === "categories"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("categories")
          }
        >
          <ChartPie size={18} />
          <span>Categories</span>
        </button>

        <p className="nav-title settings-title">
          SETTINGS
        </p>

        <button
          className={`nav-item ${
            activePage === "settings"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleNavigation("settings")
          }
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </nav>

      <div className="profile">
        <div className="profile-avatar">
          {initials}
        </div>

        <div className="profile-info">
          <strong>{name}</strong>
          <span>Personal Account</span>
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
          title="Logout"
        >
          <LogOut size={17} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;