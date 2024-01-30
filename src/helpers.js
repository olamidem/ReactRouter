export const wait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// Local storage
const generatedRandomColor = () => {
  // Get the length of existing budgets from local storage
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;

  // Generate a random color based on the existing budget length
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Fetch data from local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Create a new budget item
export const createBudget = ({ name, amount }) => {
  // Generate a unique ID for the new budget item
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    // Generate a random color for the new budget item
    color: generatedRandomColor(),
  };

  // Get the existing budgets from local storage
  const existingBudgets = fetchData("budgets") ?? [];

  // Add the new budget item to the existing budgets and store it in local storage
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
}; // Create a new Expense
export const createExpense = ({ name, amount, budgetId }) => {
  // Generate a unique ID for the new budget item
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId,
  };

  // Get the existing budgets from local storage
  const existingExpenses = fetchData("expenses") ?? [];

  // Add the new budget item to the existing budgets and store it in local storage
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const calculateSpendByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];

  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) {
      return acc;
    }
    return (acc += expense.amount);
  }, 0);

  return budgetSpent;
};

// Delete an item from local storage
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
