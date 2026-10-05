import { useEffect, useState } from "react";

import Login from "./components/Login";
import Notification from "./components/Notification";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import SummaryCards from "./components/SummaryCards";
import RecentTransactions from "./components/RecentTransactions";
import ExpenseCategories from "./components/ExpenseCategories";
import TransactionModal from "./components/TransactionModal";
import DeleteModal from "./components/DeleteModal";
import Settings from "./components/Settings";

const initialTransactions = [
  {
    id: 1,
    title: "Restaurant",
    category: "Food",
    date: "2026-09-30",
    amount: 450,
    type: "expense",
  },
  {
    id: 2,
    title: "Freelance Work",
    category: "Work",
    date: "2026-09-29",
    amount: 5000,
    type: "income",
  },
  {
    id: 3,
    title: "Internet",
    category: "Technology",
    date: "2026-10-03",
    amount: 800,
    type: "expense",
  },
];

function App() {
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions =
      localStorage.getItem("transactions");

    if (savedTransactions) {
      return JSON.parse(savedTransactions);
    }

    return initialTransactions;
  });

  const [notification, setNotification] =
    useState(null);

  const [
    notifications,
    setNotifications,
  ] = useState(() => {
    const savedNotifications =
      localStorage.getItem("notifications");

    if (savedNotifications) {
      return JSON.parse(savedNotifications);
    }

    return [];
  });

  const [
    isNotificationOpen,
    setIsNotificationOpen,
  ] = useState(false);

  const [activePage, setActivePage] =
    useState("dashboard");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] =
    useState("all");
  const [categoryFilter, setCategoryFilter] =
    useState("all");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [
    editingTransaction,
    setEditingTransaction,
  ] = useState(null);

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  const [
    deletingTransaction,
    setDeletingTransaction,
  ] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date()
      .toISOString()
      .split("T")[0],
  });

  const [settings, setSettings] = useState(() => {
    const savedSettings =
      localStorage.getItem("settings");

    const defaultSettings = {
      name: "",
      currency: "AFN",
      theme: "dark",
    };

    if (savedSettings) {
      return {
        ...defaultSettings,
        ...JSON.parse(savedSettings),
      };
    }

    return defaultSettings;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setSettings((currentSettings) => ({
        ...currentSettings,
        name: user.name,
      }));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    document.body.classList.toggle(
      "light-theme",
      settings.theme === "light"
    );
  }, [settings.theme]);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  const showNotification = (
    message,
    type = "success"
  ) => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };

    setNotification(newNotification);

    setNotifications((currentNotifications) => [
      newNotification,
      ...currentNotifications,
    ]);
  };

  const handleLogin = (newUser) => {
    setUser(newUser);

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    setSettings((currentSettings) => ({
      ...currentSettings,
      name: newUser.name,
    }));

    setActivePage("dashboard");

    showNotification(
      `Welcome ${newUser.name}! You are logged in.`,
      "login"
    );
  };

  const handleLogout = () => {
    showNotification(
      `Goodbye ${settings.name}! You have been logged out.`,
      "logout"
    );

    localStorage.removeItem("user");

    setUser(null);

    setActivePage("dashboard");

    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("all");

    setIsNotificationOpen(false);
  };

  const openAddModal = () => {
    setEditingTransaction(null);

    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
      date: new Date()
        .toISOString()
        .split("T")[0],
    });

    setIsModalOpen(true);
  };

  const openEditModal = (id) => {
    const transaction = transactions.find(
      (item) => item.id === id
    );

    if (!transaction) {
      return;
    }

    setEditingTransaction(transaction);

    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactionData = {
      title: formData.title,
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
    };

    if (editingTransaction) {
      setTransactions(
        transactions.map((transaction) => {
          if (
            transaction.id ===
            editingTransaction.id
          ) {
            return {
              ...transaction,
              ...transactionData,
            };
          }

          return transaction;
        })
      );

      showNotification(
        `"${transactionData.title}" was updated successfully.`,
        "edit"
      );
    } else {
      const newTransaction = {
        id: Date.now(),
        ...transactionData,
      };

      setTransactions([
        newTransaction,
        ...transactions,
      ]);

      showNotification(
        `"${transactionData.title}" was added successfully.`,
        "success"
      );
    }

    closeModal();
  };

  const openDeleteModal = (id) => {
    const transaction = transactions.find(
      (item) => item.id === id
    );

    if (!transaction) {
      return;
    }

    setDeletingTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const deleteTransaction = () => {
    if (!deletingTransaction) {
      return;
    }

    const deletedTitle =
      deletingTransaction.title;

    setTransactions(
      transactions.filter((transaction) => {
        return (
          transaction.id !==
          deletingTransaction.id
        );
      })
    );

    setIsDeleteModalOpen(false);
    setDeletingTransaction(null);

    showNotification(
      `"${deletedTitle}" was deleted successfully.`,
      "delete"
    );
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingTransaction(null);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setIsNotificationOpen(false);
  };

  const filteredTransactions =
    transactions.filter((transaction) => {
      const matchesSearch =
        transaction.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "all" ||
        transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        transaction.category ===
          categoryFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory
      );
    });

  const totalIncome = transactions.reduce(
    (total, transaction) => {
      if (transaction.type === "income") {
        return total + transaction.amount;
      }

      return total;
    },
    0
  );

  const totalExpenses = transactions.reduce(
    (total, transaction) => {
      if (transaction.type === "expense") {
        return total + transaction.amount;
      }

      return total;
    },
    0
  );

  const balance =
    totalIncome - totalExpenses;

  const totalTransactions =
    transactions.length;

  return (
    <>
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="app">
          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
            name={settings.name}
            onLogout={handleLogout}
          />

          <main className="main">
            <Topbar
              onAdd={openAddModal}
              name={settings.name}
              notifications={notifications}
              isNotificationOpen={
                isNotificationOpen
              }
              setIsNotificationOpen={
                setIsNotificationOpen
              }
              onClearNotifications={
                clearNotifications
              }
            />

            {activePage === "dashboard" && (
              <>
                <SummaryCards
                  totalIncome={totalIncome}
                  totalExpenses={
                    totalExpenses
                  }
                  balance={balance}
                  totalTransactions={
                    totalTransactions
                  }
                  currency={settings.currency}
                />

                <section className="dashboard-grid">
                  <RecentTransactions
                    transactions={
                      filteredTransactions
                    }
                    deleteTransaction={
                      openDeleteModal
                    }
                    editTransaction={
                      openEditModal
                    }
                    search={search}
                    setSearch={setSearch}
                    typeFilter={typeFilter}
                    setTypeFilter={
                      setTypeFilter
                    }
                    categoryFilter={
                      categoryFilter
                    }
                    setCategoryFilter={
                      setCategoryFilter
                    }
                    currency={
                      settings.currency
                    }
                  />

                  <div className="right-column">
                    <ExpenseCategories
                      transactions={
                        transactions
                      }
                      totalExpenses={
                        totalExpenses
                      }
                      currency={
                        settings.currency
                      }
                    />
                  </div>
                </section>
              </>
            )}

            {activePage === "transactions" && (
              <RecentTransactions
                transactions={
                  filteredTransactions
                }
                deleteTransaction={
                  openDeleteModal
                }
                editTransaction={
                  openEditModal
                }
                search={search}
                setSearch={setSearch}
                typeFilter={typeFilter}
                setTypeFilter={
                  setTypeFilter
                }
                categoryFilter={
                  categoryFilter
                }
                setCategoryFilter={
                  setCategoryFilter
                }
                currency={
                  settings.currency
                }
              />
            )}

            {activePage === "categories" && (
              <ExpenseCategories
                transactions={transactions}
                totalExpenses={
                  totalExpenses
                }
                currency={
                  settings.currency
                }
              />
            )}

            {activePage === "settings" && (
              <Settings
                settings={settings}
                setSettings={setSettings}
              />
            )}
          </main>

          <TransactionModal
            isOpen={isModalOpen}
            onClose={closeModal}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isEditing={
              Boolean(editingTransaction)
            }
          />

          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onConfirm={deleteTransaction}
            transaction={
              deletingTransaction
            }
          />
        </div>
      )}
    </>
  );
}

export default App;