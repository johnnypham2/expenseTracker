import categories from "../Categories";
import { TExpense } from "../../App";
import { useEffect, useState } from "react";
import { z } from "zod";
import ExpenseList from "./ExpenseList";
import { GetAllExpenses } from "../endpoints/endpoints";

const expenseSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.number(),
});

type ExpenseFormProp = {
  expenseArray: TExpense[];
  setExpenseArray: React.Dispatch<React.SetStateAction<TExpense[]>>;
};

const ExpenseForm = ({ expenseArray, setExpenseArray }: ExpenseFormProp) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAllExpenses();
        setExpenseArray(data); 
      } catch (error) {
        console.error("Error fetching expenses:", error);
        
      }
    };
  
    fetchData();
  }, [setExpenseArray]);
  

  const AddExpenses = () => {
    const validationResult = expenseSchema.safeParse({
      description,
      amount,
    });

    if (!validationResult.success) {
      // If validation fails, set an error message
      setError(validationResult.error.errors.map((e) => e.message).join(", "));
      return;
    }
    // If validation passes, clear the error message and add the expense
    setError(null);
    const expense: TExpense = {
      description: description,
      amount: amount,
      category: category,
    };
    const newArray: TExpense[] = [...expenseArray, expense];
    setExpenseArray(newArray);
  };

  return (
    <div className="expense-tracker-container">
      <div className="form-container">
        <form className="expense-form">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              onChange={(e) => setAmount(Number(e.target.value))}
              id="amount"
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              className="form-select"
            >
              <option value=""></option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="button-container">
            <button
              onClick={AddExpenses}
              type="button"
              className="btn btn-outline-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="table-container">
        <ExpenseList
          expenses={expenseArray}
          setExpenseArray={setExpenseArray}
          category={selectedCategory}
        />
        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
