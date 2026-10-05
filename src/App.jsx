import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import SummaryCards from "./components/SummaryCards";
import RecentTransactions from "./components/RecentTransactions";
import ExpenseCategories from "./components/ExpenseCategories";
import TransactionModal from "./components/TransactionModal";
import DeleteModal from "./components/DeleteModal";

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
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions =
      localStorage.getItem("transactions");

    if (savedTransactions) {
      return JSON.parse(savedTransactions);
    }

    return initialTransactions;
  });

  const [activePage, setActivePage] = useState("dashboard");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingTransaction, setEditingTransaction] =
    useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [deletingTransaction, setDeletingTransaction] =
    useState(null);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

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
    const transaction = transactions.find((item) => {
      return item.id === id;
    });

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
            transaction.id === editingTransaction.id
          ) {
            return {
              ...transaction,
              ...transactionData,
            };
          }

          return transaction;
        })
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
    }

    closeModal();
  };

  const openDeleteModal = (id) => {
    const transaction = transactions.find((item) => {
      return item.id === id;
    });

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

    setTransactions(
      transactions.filter((transaction) => {
        return (
          transaction.id !== deletingTransaction.id
        );
      })
    );

    setIsDeleteModalOpen(false);
    setDeletingTransaction(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingTransaction(null);
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

  return (
    <div className="app">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main">

        <Topbar onAdd={openAddModal} />

        {activePage === "dashboard" && (
          <>
            <SummaryCards
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              balance={balance}
              totalTransactions={totalTransactions}
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
                setCategoryFilter={
                  setCategoryFilter
                }
              />

              <div className="right-column">
                <ExpenseCategories
                  transactions={transactions}
                  totalExpenses={totalExpenses}
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
            setCategoryFilter={
              setCategoryFilter
            }
          />
        )}

        {activePage === "categories" && (
          <ExpenseCategories
            transactions={transactions}
            totalExpenses={totalExpenses}
          />
        )}

        {activePage === "settings" && (
          <div className="content-card">

            <h3>Settings</h3>

            <p>
              Settings page is coming soon.
            </p>

          </div>
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
  );
}

export default App;