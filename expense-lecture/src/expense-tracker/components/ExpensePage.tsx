import { useState } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseForm from "./ExpenseForm";
import categories from "../Categories";
import { useNavigate } from "react-router-dom";

export type TExpense = {
  id: number,
  description: string;
  amount: number;
  category: string;
};

const ExpensePage = () => {
  const [expenseArray, setExpenseArray] = useState<TExpense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const [dummyExpensesArray, setDummyExpensesArray] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utils" },
    { id: 2, description: "bbb", amount: 15, category: "Entertainment" },
    { id: 3, description: "ccc", amount: 20, category: "Food" },
    { id: 4, description: "ddd", amount: 25, category: "Shopping" },
    { id: 5, description: "eee", amount: 16, category: "Groceries" },
  ]);

  // const visibleExpense = selectedCategory
  //   ? expenseArray.filter((e) => e.category === selectedCategory)
  //   : expenseArray;

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate('/') 
  }

  return (
    <>
    <button onClick={handleLogout} className="logout">Logout</button>
      <h1 className="text-center">Expense Tracker</h1>

      <div className="mb-5">
        <ExpenseForm
          expenseArray={expenseArray}
          setExpenseArray={setExpenseArray}
        />
      </div>

      <div className="m-5">
        {/* <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)} */}
        {/* /> */}
      </div>
      <div className="m-5">
        {/* <ExpenseList category={selectedCategory} setExpenseArray={setExpenseArray} expenses={expenseArray}  /> */}
      </div>
    </>
  );
};

export default ExpensePage;