import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const FilterBy=()=> {
  return (
    <DropdownButton id="dropdown-basic-button" className='m-5' title="Filter By">
      <Dropdown.Item href="#/action-1">Gender</Dropdown.Item>
    
    </DropdownButton>
  );
}

export default FilterBy;