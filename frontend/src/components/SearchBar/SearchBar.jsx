import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="input input-bordered flex items-center gap-2 bg-slate-100">
      <input
        type="text"
        className="grow"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          onClick={onClearSearch}
          className="cursor-pointer"
          size={20}
        />
      )}
      <FaSearch onClick={handleSearch} className="cursor-pointer" />
    </div>
  );
};

export default SearchBar;
