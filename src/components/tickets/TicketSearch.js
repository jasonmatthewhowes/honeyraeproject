
//function to return a simple input field. inside the parameter for ticket search is the actual key from the ticketcontainer parent for that function. The input has a change event that utlizes the setterFunction to set the value for the state of the search.
export const TicketSearch = ({setterFunction}) => {
 return (
    <div>
    <input
    onChange={
        (changeEvent) => {
            setterFunction(changeEvent.target.value)
        }
    }
    type="text" placeholder="Enter search terms" />
    </div>
  )   
}