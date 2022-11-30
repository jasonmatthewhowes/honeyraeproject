import { useEffect, useState } from "react"
//usenavigate is a hook that allows you to utilize the navigation hook. This is needed for the createticket button
import { Link, useNavigate } from "react-router-dom"
import { Ticket } from "./Ticket"
//import css file per component
import "./Tickets.css"

export const TicketList = ({searchTermState}) => {
    //initial ticket list 
    const [tickets, setTickets] = useState([])
    //getting employees for display on claim
    const [employees, setEmployees] = useState([])
    //modified version of above depending on staff or not
    const [filteredTickets, setFiltered] = useState([])
    // below defines a new useState that lets us determine if the ticket is an emergenct or not 
    const [emergency, setEmergency] = useState(false)
    //defines a new state that we can access to further filter the tickets based on this new datapoint
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    //getting the localstorage for the user currently logged in. the login is handed in the lpogoin module
    const localHoneyUser = localStorage.getItem("honey_user")
    //the above returns a string, the below is to set the user as an object which is important becuase we need to be able to access the isStaff property on the object
    const honeyUserObject =JSON.parse(localHoneyUser)

    //the below useEffect is to watch the searchTermState so that when the state changes (which it does by typing in to the search input, it then sets the filtered state using the search term
    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase()) })
            setFiltered(searchedTickets)
        },
        [searchTermState]
    )


    //this useEffect is to monitor the state of the emergency true or false and also updates the filteredTickets array that is being displayed
    useEffect(
        () => {
           //if emergency is true, ternary operator
            if (emergency) {
               const emergencyTickets = tickets.filter (ticket => ticket.emergency===true)
               setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    //mounts the ticket array by fetching the data, running the setTickets hook to set the values to be the response from the JSON Server. the empty Array at the end of the useEffect hook tells the effect to run on intial render
    const getAllTickets = () => {
        fetch (`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
        .then (res => res.json())
        .then ((ticketArray) => {
            setTickets(ticketArray)
        } )
    }

    
    useEffect(
        () => {
            getAllTickets()

           fetch (`http://localhost:8088/employees?_expand=user`)
                .then (res => res.json())
                .then ((employeeArray) => {
                    setEmployees(employeeArray)
                } )
            },
            []
    )

    //useEffect to look at tickets state being changed which it will after the user is logged in. The intial state is empty. this useeffect is cchecking to see if the user is staff or not. The first part is a ternary operator checking to see if the userobject.staff is true. If it is true, then it will setFiltered to staff view. IF it is not, then it will set 
    useEffect(
        () => {
           if (honeyUserObject.staff) {
            //for employees, they can see all tickets
            setFiltered(tickets)
           }
           else {
           //for customers only the tickets with matching ids to the ticketUserIds will be displayed. The logic below sets the returned array to only those tickets and it is set as the filtered tickets ae
           const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
           setFiltered(myTickets)
        }
        }, 
        //below is what the useEffect is watching 
        [tickets]
    )


    //montitors the openticket state, if it changes performs logic that checks to see if the dateCompleted is empty and sets the filtered tickets
    useEffect(
        () => {
            //ternary operator, if open only is true (set by button on form) run this logic and filter tickets
            if (openOnly) {
           const openTicketArray = tickets.filter(ticket => {
            //show mathcing tickets AND tickets that do have an empty date completed 
            return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
           })
           setFiltered(openTicketArray)
        }
        //if open only is false, then set the tickets to be all the tickets
        else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
        }
    },
        [ openOnly ]
    )



    //this is what is actually represented in the site. 
   return <>
    {
        //the buttons utilize a ternary operator to ask if the employee is staff or not. if honeUserObject.staff is true, it will display the first part, if not, it will display the second set of buttons
        honeyUserObject.staff
        //below displays two buttons, emergency and show all. When clicked, the setEmergency useState is changed depending on the button clicked to true or false. this is what is shown if the ternary operator is true (is employee)
            ? <>
                <button onClick= {() => {setEmergency(true)} } >Emergency Only </button>
                <button onClick= {() => {setEmergency(false)} } >Show All</button>
        </>
        :     <>
        {/* the create ticket button utlizes the navigate hook to take the user to the ticketform page */}
                <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
        {/* changes the state of the open ticket */}
                <button onClick={() => updateOpenOnly(true) }>Show Open Tickets</button>
                <button onClick={() => updateOpenOnly(false) }>All My Tickets</button>
        </>
    }

   <h2>List of Tickets</h2>
{/* uses string interpolation to print the HTML components. The map method prints out for each object */}
   <article className="tickets">
    {
        //uses the filtered ticket array determined in the useEffect logic above, employees or not etc
        filteredTickets.map(
            (ticket) => < Ticket 
            getAllTickets={getAllTickets}
            employees={employees} 
            currentUser={honeyUserObject} 
            ticketObject={ticket} />
        )
}
        </article>
   </>
}


