import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import SummaryCards from "./components/SummaryCards";
import RecentTransactions from "./components/RecentTransactions";
import QuickAdd from "./components/QuickAdd";
import ExpenseCategories from "./components/ExpenseCategories";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">

        <Topbar />
        <SummaryCards />

        <section className="dashboard-grid">

          <RecentTransactions />

          <div className="right-column">
            <QuickAdd />
            <ExpenseCategories />
          </div>

        </section>

      </main>
    </div>
  );
}

export default App;