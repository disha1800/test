const FilterBy = ({ sort, sorting }) => {
  return (
    // <DropdownButton
    //   id="dropdown-basic-button"
    //   className="m-5"
    //   title="Filter By"
    //   value={sort}
    //   onChnange={sorting}
    // >
    //   <Dropdown.Item href="#/action-1">Male</Dropdown.Item>
    //   <Dropdown.Item href="#/action-1">Female</Dropdown.Item>
    // </DropdownButton>
    <div>
      <select value={sort} onChange={sorting}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      {sort}
    </div>
  );
};

export default FilterBy;
