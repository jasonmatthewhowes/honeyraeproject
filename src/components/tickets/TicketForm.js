import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */

//creates a new object using the useState hook with default parameters for the ticket form. update is what sets the state
    const [ticket, update] = useState({
        description: "",
        emergency: false

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

        //assigning a variable to acces the navigate hook function
    const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        /*
        "userId": 3,
        "description": "Vero est adipisci sed natus quasi consectetur occaecati. Modi maxime sunt officia cumque. Vel at culpa. Sint accusamus deserunt dolorem qui.",
        "emergency": true,
        "dateCompleted": ""
        */
        const ticketToSendToAPI = {
            //user ID grabbed rrom local storage we got at login
            userId: honeyUserObject.id,
            //use the ticket state date to generate the remaining fields
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted:""
        }
        //post method to send the object created above to the API to be created
        return fetch(`http://localhost:8088/serviceTickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
            //returns the user by using the navigate hook to the ticket list URL
            navigate("/tickets")
        })

        // TODO: Perform the fetch() to POST the object to the API
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        //runs when the input is modified
                        onChange={
                            (evt) => {
                                //create a copy of the existing state of the ticket, which is just an empty object
                                const copy = {...ticket}
                                //takes the evt parameter of the onChange event and sets the value of the description to be what was inputed by the user
                                copy.description = evt.target.value
                              update(copy) 
                            }

                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.emergency = evt.target.checked
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <button
            //handleSaveButton defined above but essentially creeates an object from the inpit data and then sends a post fetch to the API
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Ticket
            </button>
            
        </form>
    )
}

