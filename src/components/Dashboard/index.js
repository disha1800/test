
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

import FilterBy from './filter';
import List from './list'
import SortBy from './sortBy';
import Header from './header';
const Dashboard = () => {
const navigate=useNavigate()
const [token,setToken]=useState(localStorage.getItem('token'))
useEffect(()=>{
if(!token)
navigate('/')
},[token])
    return (
        <>
     
     <Header />
        

<FilterBy />
<SortBy />
<List />
</>
    )


}


export default Dashboard;