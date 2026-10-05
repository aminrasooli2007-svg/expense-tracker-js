# ExpenseFlow

A modern, responsive, and feature-rich personal expense management application built with React.

ExpenseFlow helps users track income and expenses, organize transactions, monitor their financial balance, and manage their personal financial activity through a clean and intuitive interface.

## ✨ Features

### Authentication

* Frontend login system
* First name and last name
* Password validation
* Login and logout
* Persistent login using LocalStorage

### Transaction Management

* Add transactions
* Edit transactions
* Delete transactions
* Delete confirmation modal
* Income and expense types
* Transaction categories
* Transaction dates
* Automatic transaction calculations

### Search & Filters

* Search transactions by title
* Filter by transaction type
* Filter by category
* Combined search and filtering

### Dashboard

* Total income
* Total expenses
* Current balance
* Total transactions
* Recent transactions
* Expense category summary

### Settings

* Display name
* Currency selection
* Dark mode
* Light mode
* Persistent settings

### Notifications

* Transaction added notification
* Transaction deleted notification
* Login notification
* Logout notification
* Notification history
* Notification counter

### User Experience

* Responsive design
* Mobile-friendly layout
* Empty states
* Confirmation modals
* Interactive buttons
* Lucide icons
* Smooth UI interactions

### Data Persistence

All transaction and application settings are stored using the browser's LocalStorage, allowing data to remain available after refreshing the page.

## 🛠️ Tech Stack

* React
* JavaScript
* CSS
* Vite
* Lucide React
* LocalStorage

## 📁 Project Structure

```text
src/
├── components/
│   ├── CategoryItem.jsx
│   ├── DeleteModal.jsx
│   ├── ExpenseCategories.jsx
│   ├── Login.jsx
│   ├── RecentTransactions.jsx
│   ├── Settings.jsx
│   ├── Sidebar.jsx
│   ├── SummaryCard.jsx
│   ├── SummaryCards.jsx
│   ├── Topbar.jsx
│   ├── TransactionModal.jsx
│   ├── TransactionRow.jsx
│   └── TransactionToolbar.jsx
│
├── App.jsx
├── index.css
└── main.jsx
```

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/aminrasooli2007-svg/expense-tracker-js.git
```

Navigate to the project:

```bash
cd expense-tracker-js
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL provided by Vite in your browser.

## 🔐 Demo Login

The current authentication system is frontend-only and is intended for demonstration purposes.

Password:

```text
admin00123
```

## ⚠️ Important Note

ExpenseFlow currently uses LocalStorage for authentication, transactions, settings, and notifications.

This means the authentication system is not suitable for production applications that require real user security.

A future version could connect the application to a backend API and database for real authentication and multi-user data management.

## 📌 Project Status

**Version 1.0 — Completed**

The main functionality and UI of ExpenseFlow have been implemented and tested.

## 🎯 Future Improvements

Possible future improvements include:

* Backend authentication
* Database integration
* Multi-user accounts
* Cloud data synchronization
* Financial charts
* Export transactions
* Recurring transactions
* Advanced analytics
* Real-time notifications

## 👨‍💻 Author

**Amin Rasooli**

Frontend Developer

GitHub:
https://github.com/aminrasooli2007-svg

## 📄 License

This project was created for learning, portfolio development, and educational purposes.
