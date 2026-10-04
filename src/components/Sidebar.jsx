import {
  LayoutDashboard,
  ArrowLeftRight,
  ChartPie,
  Settings,
  Wallet,
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const handleNavigation = (page) => {
    setActivePage(page);
  };

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
            activePage === "dashboard" ? "active" : ""
          }`}
          onClick={() => handleNavigation("dashboard")}
        >
          <LayoutDashboard size={18} />

          <span>Dashboard</span>
        </button>

        <button
          className={`nav-item ${
            activePage === "transactions" ? "active" : ""
          }`}
          onClick={() => handleNavigation("transactions")}
        >
          <ArrowLeftRight size={18} />

          <span>Transactions</span>
        </button>

        <button
          className={`nav-item ${
            activePage === "categories" ? "active" : ""
          }`}
          onClick={() => handleNavigation("categories")}
        >
          <ChartPie size={18} />

          <span>Categories</span>
        </button>

        <p className="nav-title settings-title">
          SETTINGS
        </p>

        <button
          className={`nav-item ${
            activePage === "settings" ? "active" : ""
          }`}
          onClick={() => handleNavigation("settings")}
        >
          <Settings size={18} />

          <span>Settings</span>
        </button>

      </nav>

      <div className="profile">

        <div className="profile-avatar">
          AR
        </div>

        <div className="profile-info">
          <strong>Amin Rasooli</strong>
          <span>Personal Account</span>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;