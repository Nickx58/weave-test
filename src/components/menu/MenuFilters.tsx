import FilterItem from "./FilterItem";
import styles from "./MenuFilters.module.css";
import { MenuFilter as MenuFilterType } from "../../api/menu";

type MenuFilterProps = {
  menuFilters: MenuFilterType[];
  onSelected: (key: string) => void;
  selectedItem: string;
};

export function MenuFilters({
  menuFilters,
  onSelected,
  selectedItem,
}: MenuFilterProps) {
  const selectItem = (key: string) => {
    onSelected(key);
  };

  return (
    <div className={styles.root}>
      <FilterItem
        isSelected={selectedItem === "all"}
        onClick={() => selectItem("all")}
      >
        All
      </FilterItem>
      {menuFilters.map((item) => (
        <FilterItem
          isSelected={selectedItem === item.id}
          key={item.id}
          onClick={() => selectItem(item.id)}
        >
          {item.label}
        </FilterItem>
      ))}
    </div>
  );
}
