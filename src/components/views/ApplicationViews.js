import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>
//this is where the TicketList component is run
                <Route path="tickets" element={ <TicketList /> } />

//this is where the ticket form is run 
				<Route path="ticket/create" element={ <TicketForm/> } />
            </Route>
        </Routes>
    )
}
