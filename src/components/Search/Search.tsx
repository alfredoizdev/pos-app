import { ChangeEvent, FC, useContext, useState } from "react";
import { AppContext } from "../../context";
import styles from "./Search.module.css";

const Search: FC = () => {
  const { filterByParams } = useContext(AppContext);
  const [query, setQuery] = useState("");

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
    filterByParams(target.value);
  };

  const handleClear = () => {
    setQuery("");
    filterByParams("");
  };

  return (
    <div className={styles.field}>
      <input
        className={styles.filterField}
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        onKeyUp={({ code }) =>
          code === "Enter" ? filterByParams(query) : undefined
        }
      />
      {query.trim() !== "" && (
        <button className={styles.clear} type="button" onClick={handleClear}>
          X
        </button>
      )}
    </div>
  );
};

export default Search;
