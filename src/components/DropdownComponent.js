import React,{useState,useEffect} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


const DropdownComponent = () => {

  const [item,setItem]= useState([]);

  const fetchData = () => {
    fetch("http://cootz-backend-api.herokuapp.com/getallcontests").then((response) => {
    return response.json();
  }).then((data) => {
    // console.log(data);
    setItem(data)
  })
  }
  
  useEffect(() => {
    fetchData();
  },[])

  console.log(item[0]);



  return (
    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      SELECT CONTEST TYPE
    </Dropdown.Toggle>
  
    <Dropdown.Menu>
      {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}

      {item.map(data =>(
        <Dropdown.Item  eventKey={data._id.toString()} onClick={() => console.log(data._id.toString())} >{data.constestType} : {data.contestsubType}</Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
  )
};

export default DropdownComponent;
