import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const SortBy=()=> {
  return (
    <DropdownButton id="dropdown-basic-button" title="Sort By" className='m-5'>
      <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Email </Dropdown.Item>
      <Dropdown.Item href="#/action-3">Address</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Mobile</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Gender</Dropdown.Item>
    </DropdownButton>
  );
}

export default SortBy;