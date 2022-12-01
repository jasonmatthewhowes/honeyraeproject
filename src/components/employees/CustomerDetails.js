import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    // useParams hook grabs the employeeID out of the URL, then you go get the data using the fetch call
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
         fetch(`http://localhost:8088/customers?_expand=user&id=${customerId}`)
        .then (response => response.json())
        .then((data) => {
            const singleCustomer = data [0]
            updateCustomer(singleCustomer)
         })   
        },
        [customerId]
    )

    return <section className="customer">
        {/* when going deeper in the layers, use the ? after the intial layer in case that later is null */}
    <header className="customer__header">{customer?.user?.fullName} </header>
    <div>Email: {customer?.user?.email}</div>
    <div>Address: {customer.address}</div>
    <div>Phone:{customer.phoneNumber}</div>
    
  </section>
}