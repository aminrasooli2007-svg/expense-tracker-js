import {
  LayoutDashboard,
  ArrowLeftRight,
  ChartPie,
  Settings,
  Wallet,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo">
        <div className="logo-icon">
          <Wallet size={21} />
        </div>

        <span>ExpenseFlow</span>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <p className="nav-title">MAIN MENU</p>

        <a href="#" className="nav-item active">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </a>

        <a href="#" className="nav-item">
          <ArrowLeftRight size={18} />
          <span>Transactions</span>
        </a>

        <a href="#" className="nav-item">
          <ChartPie size={18} />
          <span>Categories</span>
        </a>

        <p className="nav-title settings-title">
          SETTINGS
        </p>

        <a href="#" className="nav-item">
          <Settings size={18} />
          <span>Settings</span>
        </a>
      </nav>

      {/* Profile */}
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