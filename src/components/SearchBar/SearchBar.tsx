import { FC } from "react";
import "./SearchBar.sass";

interface SearchBarProps {
  loading: boolean;
  query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  loading,
  query,
  onQueryChange,
  onSearchClick,
}) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={query}
        onChange={onQueryChange}
        placeholder="Enter account name"
        disabled={loading}
      />
      <button onClick={onSearchClick} disabled={loading}>
        {loading ? "Loading..." : "Search NFTs"}
      </button>
    </div>
  );
};

export default SearchBar;
