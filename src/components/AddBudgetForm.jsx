/* eslint-disable react-hooks/exhaustive-deps */
import { CurrencyDollarIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

export const AddBudgetForm = () => {
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting, focusRef]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Budget Amount</label>
          <input
            type="number"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Creating budget.....</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};
