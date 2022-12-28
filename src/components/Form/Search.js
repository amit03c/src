const Search = ({ state, setState, classes, placeholder }) => {
  return (
    <>
      <div className="search">
        <div className="icon">
          <i className="fa-light fa-fw fa-magnifying-glass"></i>
        </div>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className={"search-input" + (" " + classes)}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default Search;
