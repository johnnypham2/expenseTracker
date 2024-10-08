import categories from "../Categories";
interface FilterProps {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: FilterProps) => {
  return (
    <>
      <select
        className="form-select"
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
};

export default ExpenseFilter;
