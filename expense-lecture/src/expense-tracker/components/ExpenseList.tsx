import React, { useState } from 'react';
import { TExpense } from "../../App";

interface ExpenseProps {
  expenses: TExpense[];
  setExpenseArray: React.Dispatch<React.SetStateAction<TExpense[]>>;
  category: string;
}

const ExpenseList = ({ expenses, setExpenseArray, category }: ExpenseProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedExpense, setEditedExpense] = useState<TExpense | null>(null);

  const onDelete = (expenseItemIndex: number) => {
    const tempArray: TExpense[] = [...expenses];
    tempArray.splice(expenseItemIndex, 1);
    setExpenseArray(tempArray);
  };

  const onEdit = (expenseItemIndex: number) => {
    setEditingIndex(expenseItemIndex);
    setEditedExpense({ ...expenses[expenseItemIndex] });
  };

  const onSave = () => {
    if (editingIndex !== null && editedExpense) {
      const tempArray: TExpense[] = [...expenses];
      tempArray[editingIndex] = editedExpense;
      setExpenseArray(tempArray);
      setEditingIndex(null);
      setEditedExpense(null);
    }
  };

  const onCancel = () => {
    setEditingIndex(null);
    setEditedExpense(null);
  };

  return (
    <>
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(category === "All" ? expenses : expenses.filter((expense) => expense.category === category))
            .map((expense, idx) => (
              <tr key={idx}>
                <td>
                  {editingIndex === idx ? (
                    <input
                      type="text"
                      value={editedExpense?.description}
                      onChange={(e) => setEditedExpense({ ...editedExpense!, description: e.target.value })}
                    />
                  ) : (
                    expense.description
                  )}
                </td>
                <td>
                  {editingIndex === idx ? (
                    <input
                      type="number"
                      value={editedExpense?.amount}
                      onChange={(e) => setEditedExpense({ ...editedExpense!, amount: Number(e.target.value) })}
                    />
                  ) : (
                    expense.amount
                  )}
                </td>
                <td>
                  {editingIndex === idx ? (
                    <input
                      type="text"
                      value={editedExpense?.category}
                      onChange={(e) => setEditedExpense({ ...editedExpense!, category: e.target.value })}
                    />
                  ) : (
                    expense.category
                  )}
                </td>
                <td>
                  {editingIndex === idx ? (
                    <>
                      <button className="btn btn-outline-success me-2" onClick={onSave}>Save</button>
                      <button className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-outline-primary me-2" onClick={() => onEdit(idx)}>Edit</button>
                      <button className="btn btn-outline-danger" onClick={() => onDelete(idx)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>
              {expenses
                .reduce((acc, expense) => expense.amount + acc, 0)
                .toFixed(2)}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default ExpenseList;