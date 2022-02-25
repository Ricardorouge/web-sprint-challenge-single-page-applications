import React,{useState, useEffect} from "react";
import { Route, Link } from "react-router-dom"
import OrderForm from "./Components/orderForm";
import axios from 'axios'




const App = () => {

  const[orders,setOrders] = useState([])

  

  const orderSubmit =(newOrder)=>{
    axios.post('https://reqres.in/api/orders',newOrder)
    .then(res=>{
      // console.log('test',res)
      setOrders([...orders,res.data])
      console.log(orders)
    }).catch(err=>{console.error(err)})
    
  }

  return (
    <div className = 'App'>
      <header>
        <Link to="/" >Home</Link>
        <Link to='/pizza' id ='order-pizza'>Order Pizza Now!</Link>
      </header>

      <Route exact path ='/pizza'>
        <h1>Customize Your Pizza!</h1>
        <OrderForm orderSubmit = {orderSubmit}></OrderForm>
      </Route>
    </div>
  );
};
export default App;
