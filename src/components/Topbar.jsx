import { Bell, Plus } from "lucide-react";
import NotificationPanel from "./NotificationPanel";

function Topbar({
  onAdd,
  name,
  notifications,
  isNotificationOpen,
  setIsNotificationOpen,
  onClearNotifications,
}) {
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleNotificationClick = () => {
    setIsNotificationOpen(
      !isNotificationOpen
    );
  };

  return (
    <header className="topbar">
      <div>
        <p className="welcome">
          Welcome back, {name} 👋
        </p>

        <h1>Dashboard</h1>
      </div>

      <div className="topbar-actions">
        <div className="notification-wrapper">
          <button
            className="icon-button"
            onClick={handleNotificationClick}
            title="Notifications"
          >
            <Bell size={19} />

            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount > 9
                  ? "9+"
                  : unreadCount}
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <NotificationPanel
              notifications={notifications}
              onClose={() =>
                setIsNotificationOpen(false)
              }
              onClear={onClearNotifications}
            />
          )}
        </div>

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