/* eslint-disable no-unused-vars */
//loader
//react router dom import
import {useLoaderData} from "react-router-dom";
//helper function
import {createBudget, createExpense, fetchData, wait} from "../helpers";
import {Into} from "../components/Into";
import {toast} from "react-toastify";
import {AddBudgetForm} from "../components/AddBudgetForm";
import {AddExpenseForm} from "../components/AddExpenseForm";
import {BudgetItem} from "../components/BudgetItem";

//loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return {userName, budgets};
}

//action
export async function dashboardAction({request}) {
    await wait();
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            toast.success(`Welcome ${values.userName}`);
        } catch (error) {
            throw new Error("There was a problem creating your account");
        }
    }
    if (_action === "createBudget") {
        try {
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,
            });
            return toast.success("Budget created");
        } catch (error) {
            throw new Error("Unable to create budget!");
        }
    }
    if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget,
            });
            return toast.success(`Expense ${values.newExpense} created!`);
        } catch (error) {
            throw new Error("Unable to creating your expense!");
        }
    }
    return null;
}

const Dashboard = () => {
    const {userName, budgets} = useLoaderData();
    return (
        <>
            {userName ? (
                <div className="dashboard">
                    <h1>
                        Welcome back, <span className="accent">{userName}</span>
                    </h1>
                    <div className="grid-sm">
                        {budgets && budgets.length > 0 ? (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm/>
                                    <AddExpenseForm budgets={budgets}/>
                                </div>
                                <h2>Existing Budget</h2>
                                <div className="budgets">
                                    {budgets.map((budget) => (
                                        <BudgetItem key={budget.id} budget={budget}/>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="grid-sm">
                                <p>Personal budgeting is the secret to financial freedom.</p>
                                <p>Create a budget to get started!</p>
                                <AddBudgetForm/>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Into/>
            )}
        </>
    );
};
export default Dashboard;
