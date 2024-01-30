import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

/* eslint-disable react/prop-types */
export const AddExpenseForm = ({ budgets }) => {
  const formRef = useRef();
  const focusRef = useRef();

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "isSubmitting";

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();

      formRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>
      </h2>

      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="NewExpense"
              placeholder="e.g., Coffee"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpense">Amount</label>
            <input
              type="number"
              name="newExpenseAmount"
              step="0.01"
              inputMode="decimal"
              id="newExpenseAmount"
              placeholder="e.g, 3.50"
              required
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>isSubmitting.....</span>
          ) : (
            <>
              <span>Add Expense</span>
              <PlusCircleIcon />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};
