import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="navbar shadow">
      <div className="container mx-auto gap-4 grid grid-cols-4">
        <div className="col-span-2 md:order-1 md:col-span-1">
          <ProfileInfo userInfo={userInfo} />
        </div>

        <div className="col-span-2 justify-self-end md:order-3 md:col-span-1">
          <button
            className="text-sm text-white px-4 py-2 bg-red-500 rounded"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
        <div className="col-span-4 md:order-2 md:col-span-2">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
