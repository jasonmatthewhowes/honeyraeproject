// This module loads the employee view and is inserted in to the application views module
import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../employees/CustomerDetails"
import { CustomerList } from "../employees/CustomerList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { EmployeeList } from "../employees/EmployeeList"
import { Profile } from "../profile/Profile"
import { TicketContainer } from "../tickets/TicketContainer"
import { TicketForm } from "../tickets/TicketForm"


export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>
{/* this is where the TicketList component is run inside the ticketcontainer. Grouped together the two items ticketsearch and tickelist together to make them sibling components. That parent/child means the smaller componenet is inside. Thius is how you group compnenets for props access */}
                <Route path="tickets" element={ <TicketContainer /> } />
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="customers" element={ < CustomerList /> } />
                <Route path="profile" element={ < Profile /> } />
                {/* when the route is at the below, load the EmployeeDetails function or Customer Details function defined in other module */}
                <Route path="employees/:employeeId" element={ <EmployeeDetails />} />
                <Route path="customers/:customerId" element={ <CustomerDetails />} />
            </Route>
        </Routes>
    )
}
