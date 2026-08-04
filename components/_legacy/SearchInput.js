const SearchInput = ({ filterText, onFilter }) => {
  return (
    <div className="w-1/3 h-10 pl-3 pr-2 bg-white rounded-md border flex justify-between items-center relative">
      <svg
        fill="none"
        stroke="#7E8CA3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Cari Kabupaten/Kota"
        aria-label="Search Input"
        className="appearance-none w-full outline-none focus:outline-none active:outline-none px-2"
        value={filterText}
        onChange={onFilter}
      />
    </div>
  );
};

export default SearchInput;
