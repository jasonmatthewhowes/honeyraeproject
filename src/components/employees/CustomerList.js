// this module displays all the customers
import { useEffect, useState } from "react";
import { Customer } from "./Customer";

import "./Customers.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

  useEffect(() => {
     fetch(`http://localhost:8088/customers?_expand=user`)
      .then((response) => response.json())
      .then((customerArray) => {
        setCustomers(customerArray);
      });
  }, []);

  return  <article className="customers">
      {
        // key is needed at the parent level, the other keys are for naming and sending props to the children in the Employee component
      customers.map(customer => <Customer 
        key={`customer--${customer.id}`}
        id={customer.id} 
        phoneNumber={customer.phoneNumber} 
        address={customer.address} 
        fullName={customer?.user?.fullName} 
        email={customer?.user?.email}  /> )
      }
    </article>
 
}