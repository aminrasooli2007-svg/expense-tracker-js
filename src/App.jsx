import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import SummaryCards from "./components/SummaryCards";
import RecentTransactions from "./components/RecentTransactions";
import QuickAdd from "./components/QuickAdd";
import ExpenseCategories from "./components/ExpenseCategories";
import { useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Restaurant",
      category: "Food",
      date: "Sep 30, 2026",
      amount: 450,
      type: "expense",
    },
    {
      id: 2,
      title: "Freelance Work",
      category: "Work",
      date: "Sep 29, 2026",
      amount: 5000,
      type: "income",
    },
  ])
  const deleteTransaction = (id) => {
    const updatedTrancation = transactions.filter((transaction) => {
      return transaction.id !== id
    })
    setTransactions(updatedTrancation)
  }

  const newtransaction = {
    id: 3,
    title: "Internet",
    category: "Technology",
    date: "Oct 3, 2026",
    amount: 800,
    type: "expense",
  };



  const exists = transactions.some((transaction) => {
    return transaction.id === newtransaction.id
  })

  const addTransaction = () => {
    if (exists === true) {
      return
    }
    setTransactions([
      ...transactions,
      newtransaction
    ])
  }

  const totalIncome = transactions.reduce((total, transaction) => {
    if (transaction.type === "income") {
      return total + transaction.amount;
    }

    return total;
  }, 0);

  const totalExpenses = transactions.reduce((total, transaction) => {
    if (transaction.type === "expense") {
      return total + transaction.amount;
    }

    return total;
  }, 0);

  const balance = totalIncome - totalExpenses;

  const totalTransactions = transactions.length;

  return (
    <div className="app">
      <Sidebar />

      <main className="main">

        <Topbar />
        <SummaryCards totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
          totalTransactions={totalTransactions} />

        <section className="dashboard-grid">

          <RecentTransactions transactions={transactions} deleteTransaction={deleteTransaction} addTransaction={addTransaction} />

          <div className="right-column">
            <QuickAdd />
            <ExpenseCategories transactions={transactions} totalExpenses={totalExpenses}/>
          </div>

        </section>

      </main>
    </div>
  );
}

export default App;