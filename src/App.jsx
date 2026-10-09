
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

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

function getUserFromSession(authUser) {
  if (!authUser) {
    return null;
  }

  const metadata = authUser.user_metadata || {};
  const firstName = metadata.first_name || "";
  const lastName = metadata.last_name || "";

  return {
    id: authUser.id,
    email: authUser.email,
    firstName,
    lastName,
    name:
      metadata.full_name ||
      `${firstName} ${lastName}`.trim() ||
      authUser.email,
  };
}

function mapTransaction(transaction) {
  return {
    ...transaction,
    amount: Number(transaction.amount),
  };
}

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  const [notification, setNotification] = useState(null);
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("notifications");

    if (savedNotifications) {
      try {
        return JSON.parse(savedNotifications);
      } catch {
        return [];
      }
    }

    return [];
  });

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTransaction, setDeletingTransaction] = useState(null);
  const [isSavingTransaction, setIsSavingTransaction] = useState(false);
  const [isDeletingTransaction, setIsDeletingTransaction] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  const [settings, setSettings] = useState(() => {
    const defaultSettings = {
      name: "",
      currency: "AFN",
      theme: "dark",
    };

    const savedSettings = localStorage.getItem("settings");

    if (savedSettings) {
      try {
        return {
          ...defaultSettings,
          ...JSON.parse(savedSettings),
        };
      } catch {
        return defaultSettings;
      }
    }

    return defaultSettings;
  });

  const showNotification = (message, type = "success") => {
    const newNotification = {
      id: `${Date.now()}-${Math.random()}`,
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

  useEffect(() => {
    let active = true;

    const applySession = (session) => {
      if (!active) {
        return;
      }

      setUser(getUserFromSession(session?.user));
      setAuthLoading(false);
    };

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) {
        return;
      }

      if (error) {
        setUser(null);
        setAuthLoading(false);
        showNotification(
          "Unable to restore your session. Please log in again.",
          "error"
        );
        return;
      }

      applySession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setSettings((currentSettings) => ({
        ...currentSettings,
        name: "",
      }));
      return;
    }

    setSettings((currentSettings) => ({
      ...currentSettings,
      name: user.name,
    }));
  }, [user]);

  useEffect(() => {
    if (!user?.id) {
      setTransactions([]);
      setTransactionsLoading(false);
      return;
    }

    let active = true;

    const loadTransactions = async () => {
      setTransactionsLoading(true);

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .order("created_at", { ascending: false });

      if (!active) {
        return;
      }

      if (error) {
        setTransactions([]);
        showNotification(
          `Could not load transactions: ${error.message}`,
          "error"
        );
      } else {
        setTransactions((data || []).map(mapTransaction));
      }

      setTransactionsLoading(false);
    };

    loadTransactions();

    return () => {
      active = false;
    };
  }, [user?.id]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
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

    return () => {
      document.body.classList.remove("light-theme");
    };
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

  const handleLogin = (newUser) => {
    setUser(newUser);
    setActivePage("dashboard");

    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("all");

    showNotification(
      `Welcome ${newUser.name}! You are logged in.`,
      "login"
    );
  };

  const handleLogout = async () => {
    const loggedOutName = user?.name || settings.name;

    const { error } = await supabase.auth.signOut();

    if (error) {
      showNotification(
        `Could not log out: ${error.message}`,
        "error"
      );
      return;
    }

    setUser(null);
    setTransactions([]);
    setActivePage("dashboard");
    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setIsNotificationOpen(false);
    setNotifications([]);
    setSettings((currentSettings) => ({
      ...currentSettings,
      name: "",
    }));

    showNotification(
      `Goodbye ${loggedOutName}! You have been logged out.`,
      "logout"
    );
  };

  const openAddModal = () => {
    setEditingTransaction(null);

    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
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
    if (isSavingTransaction) {
      return;
    }

    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id || isSavingTransaction) {
      return;
    }

    const amount = Number(formData.amount);

    if (
      !formData.title.trim() ||
      !formData.date ||
      !Number.isFinite(amount) ||
      amount < 0
    ) {
      showNotification(
        "Please enter a valid title, date, and amount.",
        "error"
      );
      return;
    }

    const transactionData = {
      title: formData.title.trim(),
      amount,
      type: formData.type,
      category: formData.category,
      date: formData.date,
    };

    setIsSavingTransaction(true);

    try {
      if (editingTransaction) {
        const { data, error } = await supabase
          .from("transactions")
          .update(transactionData)
          .eq("id", editingTransaction.id)
          .eq("user_id", user.id)
          .select()
          .single();

        if (error) {
          throw error;
        }

        setTransactions((currentTransactions) =>
          currentTransactions.map((transaction) =>
            transaction.id === data.id
              ? mapTransaction(data)
              : transaction
          )
        );

        showNotification(
          `"${transactionData.title}" was updated successfully.`,
          "edit"
        );
      } else {
        const { data, error } = await supabase
          .from("transactions")
          .insert({
            ...transactionData,
            user_id: user.id,
          })
          .select()
          .single();

        if (error) {
          throw error;
        }

        setTransactions((currentTransactions) => [
          mapTransaction(data),
          ...currentTransactions,
        ]);

        showNotification(
          `"${transactionData.title}" was added successfully.`,
          "success"
        );
      }

      setIsModalOpen(false);
      setEditingTransaction(null);
    } catch (error) {
      showNotification(
        `Could not save transaction: ${error.message}`,
        "error"
      );
    } finally {
      setIsSavingTransaction(false);
    }
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

  const deleteTransaction = async () => {
    if (
      !deletingTransaction ||
      !user?.id ||
      isDeletingTransaction
    ) {
      return;
    }

    setIsDeletingTransaction(true);

    const transactionToDelete = deletingTransaction;

    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", transactionToDelete.id)
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      setTransactions((currentTransactions) =>
        currentTransactions.filter(
          (transaction) =>
            transaction.id !== transactionToDelete.id
        )
      );

      setIsDeleteModalOpen(false);
      setDeletingTransaction(null);

      showNotification(
        `"${transactionToDelete.title}" was deleted successfully.`,
        "delete"
      );
    } catch (error) {
      showNotification(
        `Could not delete transaction: ${error.message}`,
        "error"
      );
    } finally {
      setIsDeletingTransaction(false);
    }
  };

  const closeDeleteModal = () => {
    if (isDeletingTransaction) {
      return;
    }

    setIsDeleteModalOpen(false);
    setDeletingTransaction(null);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setIsNotificationOpen(false);
  };

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const matchesSearch = transaction.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "all" ||
        transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        transaction.category === categoryFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory
      );
    }
  );

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

  const balance = totalIncome - totalExpenses;
  const totalTransactions = transactions.length;

  if (authLoading) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">
            <div className="login-logo-icon">
              <span>...</span>
            </div>
            <span>ExpenseFlow</span>
          </div>
          <div className="login-header">
            <h1>Loading your account</h1>
            <p>Please wait a moment.</p>
          </div>
        </div>
      </div>
    );
  }

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
              isNotificationOpen={isNotificationOpen}
              setIsNotificationOpen={setIsNotificationOpen}
              onClearNotifications={clearNotifications}
            />

            {transactionsLoading && (
              <p role="status">Loading transactions...</p>
            )}

            {activePage === "dashboard" && (
              <>
                <SummaryCards
                  totalIncome={totalIncome}
                  totalExpenses={totalExpenses}
                  balance={balance}
                  totalTransactions={totalTransactions}
                  currency={settings.currency}
                />

                <section className="dashboard-grid">
                  <RecentTransactions
                    transactions={filteredTransactions}
                    deleteTransaction={openDeleteModal}
                    editTransaction={openEditModal}
                    search={search}
                    setSearch={setSearch}
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    currency={settings.currency}
                  />

                  <div className="right-column">
                    <ExpenseCategories
                      transactions={transactions}
                      totalExpenses={totalExpenses}
                      currency={settings.currency}
                    />
                  </div>
                </section>
              </>
            )}

            {activePage === "transactions" && (
              <RecentTransactions
                transactions={filteredTransactions}
                deleteTransaction={openDeleteModal}
                editTransaction={openEditModal}
                search={search}
                setSearch={setSearch}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                currency={settings.currency}
              />
            )}

            {activePage === "categories" && (
              <ExpenseCategories
                transactions={transactions}
                totalExpenses={totalExpenses}
                currency={settings.currency}
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
            isEditing={Boolean(editingTransaction)}
          />

          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onConfirm={deleteTransaction}
            transaction={deletingTransaction}
          />
        </div>
      )}
    </>
  );
}

export default App;
