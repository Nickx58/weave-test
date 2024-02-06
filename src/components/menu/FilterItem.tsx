import { cls } from "../../utils";
import styles from "./MenuFilters.module.css";

type FilterItemProps = {
  children: string;
  onClick: React.HTMLAttributes<HTMLDivElement>["onClick"];
  isSelected?: boolean;
};

const FilterItem = ({ children, onClick, isSelected }: FilterItemProps) => {
  return (
    <div
      className={cls(styles.item, isSelected && styles.selected)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FilterItem;
