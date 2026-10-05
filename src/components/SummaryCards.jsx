
import SummaryCard from "./SummaryCard";

function SummaryCards({
  totalIncome,
  totalExpenses,
  balance,
  totalTransactions,
  currency,
}) {
  return (
    <section className="summary-grid">
      <SummaryCard
        title="Total Balance"
        amount={balance}
        type="balance"
        currency={currency}
      />

      <SummaryCard
        title="Total Income"
        amount={totalIncome}
        type="income"
        currency={currency}
      />

      <SummaryCard
        title="Total Expenses"
        amount={totalExpenses}
        type="expense"
        currency={currency}
      />

      <SummaryCard
        title="Total Transactions"
        amount={totalTransactions}
        type="transaction"
      />
    </section>
  );
}

export default SummaryCards;

