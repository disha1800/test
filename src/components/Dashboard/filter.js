const FilterBy = ({ filter }) => {
  return (
   
    <div className="m-3">Filter By
      <select defaultValue="Choose " onChange={(e)=>{ filter(e.target.value)}}>
      <option value=''>All</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
     
    </div>
  );
};

export default FilterBy;
