// This module loads the customer view and is inserted in to the application views module
import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../profile/Profile"
import { TicketEdit } from "../tickets/TicketEdit"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"


export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>
//this is where the TicketList component is run inside the ticketcontainer. Grouped together the two items ticketsearch and tickelist together to make them sibling components. That parent/child means the smaller componenet is inside. Thius is how you group compnenets for props access
                <Route path="tickets" element={ <TicketList /> } />
                <Route path="profile" element={ < Profile /> } />

//this is where the ticket form is run 
				<Route path="ticket/create" element={ <TicketForm/> } />
                <Route path="tickets/:ticketId/edit" element={ <TicketEdit/> } />
            </Route>
        </Routes>
    )
}
