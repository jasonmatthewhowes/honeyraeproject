import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    // useParams hook grabs the employeeID out of the URL, then you go get the data using the fetch call
    const {employeeId} = useParams()
    const [employee, updateEmployee] = useState({})

    useEffect(
        () => {
         fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
        .then (response => response.json())
        .then((data) => {
            const singleEmployee = data [0]
            updateEmployee(singleEmployee)
         })   
        },
        [employeeId]
    )

    return <section className="employee">
        {/* when going deeper in the layers, use the ? after the intial layer in case that later is null */}
    <header className="employee__header">{employee?.user?.fullName} </header>
    <div>Email: {employee?.user?.email}</div>
    <div>Specialty: {employee.specialty}</div>
    <div>Rate:${employee.rate}</div>
    <footer className="employee__footer">Currently Working on {employee?.employeeTickets?.length} tickets</footer>
  </section>
}