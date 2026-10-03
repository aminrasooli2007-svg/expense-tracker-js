import SummaryCard from "./SummaryCard";

function SummaryCards({ totalIncome, totalExpenses, balance , totalTransactions }) {
  return (
    <section className="summary-grid">
      <SummaryCard title="Total Balance"
        amount={balance}
        type="balance" />

      <SummaryCard title="Total Income"
        amount={totalIncome}
        type="income" />

      <SummaryCard title="Total Expenses"
        amount={totalExpenses}
        type="expense" />

        <SummaryCard title="Total Transactions"
        amount={totalTransactions}
        type="transaction" />

    </section>

  );
}

export default SummaryCards;