export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800))

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
};

// Delete an item from local storage
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};
