import {
  CheckCircle2,
  LogIn,
  LogOut,
  Trash2,
  Pencil,
  Bell,
  X,
} from "lucide-react";

function NotificationPanel({
  notifications,
  onClose,
  onClear,
}) {
  const icons = {
    success: CheckCircle2,
    login: LogIn,
    logout: LogOut,
    delete: Trash2,
    edit: Pencil,
  };

  return (
    <div className="notification-panel">
      <div className="notification-panel-header">
        <div>
          <h3>Notifications</h3>
          <p>
            {notifications.length === 0
              ? "No notifications"
              : `${notifications.length} notification${
                  notifications.length > 1
                    ? "s"
                    : ""
                }`}
          </p>
        </div>

        <div className="notification-panel-actions">
          {notifications.length > 0 && (
            <button
              onClick={onClear}
              title="Clear all"
            >
              Clear all
            </button>
          )}

          <button
            className="notification-close"
            onClick={onClose}
            title="Close"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="notification-empty">
            <div className="notification-empty-icon">
              <Bell size={22} />
            </div>

            <strong>No notifications</strong>

            <span>
              Your notifications will appear here.
            </span>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon =
              icons[notification.type] ||
              CheckCircle2;

            return (
              <div
                className={`notification-item ${
                  notification.read
                    ? "read"
                    : "unread"
                }`}
                key={notification.id}
              >
                <div className="notification-item-icon">
                  <Icon size={17} />
                </div>

                <div className="notification-item-content">
                  <p>{notification.message}</p>

                  <span>
                    {notification.time}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default NotificationPanel;