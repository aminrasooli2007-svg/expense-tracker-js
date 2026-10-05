import {
  CheckCircle2,
  LogIn,
  LogOut,
  Trash2,
  Pencil,
  X,
} from "lucide-react";

function Notification({
  notification,
  onClose,
}) {
  if (!notification) {
    return null;
  }

  const icons = {
    success: CheckCircle2,
    login: LogIn,
    logout: LogOut,
    delete: Trash2,
    edit: Pencil,
  };

  const Icon =
    icons[notification.type] || CheckCircle2;

  const background =
    notification.type === "delete"
      ? "#3b1717"
      : notification.type === "logout"
      ? "#252525"
      : "#132b20";

  const border =
    notification.type === "delete"
      ? "#7f1d1d"
      : notification.type === "logout"
      ? "#3f3f46"
      : "#166534";

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 9999,
        minWidth: "300px",
        maxWidth: "380px",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background,
        border: `1px solid ${border}`,
        borderRadius: "14px",
        boxShadow:
          "0 15px 40px rgba(0, 0, 0, 0.35)",
        color: "#ffffff",
        animation:
          "expenseFlowNotification 0.3s ease",
      }}
    >
      <Icon
        size={21}
        style={{
          flexShrink: 0,
        }}
      />

      <span
        style={{
          flex: 1,
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "1.5",
        }}
      >
        {notification.message}
      </span>

      <button
        onClick={onClose}
        style={{
          border: "none",
          background: "transparent",
          color: "#a1a1aa",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2px",
        }}
      >
        <X size={17} />
      </button>

      <style>
        {`
          @keyframes expenseFlowNotification {
            from {
              opacity: 0;
              transform: translateY(-12px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Notification;