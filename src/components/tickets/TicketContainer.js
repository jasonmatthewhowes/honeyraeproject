import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"
//this is to be the parent of the ticketsearch and ticketlist. This grouping will allow us to have access using props to both the sibling components. The ticket search comp needs access to set the terms, and the icketlist needs access to search term state. The setterFunction and searchTermState are the keys that tell React that these are props. 
export const TicketContainer = () => {
     const [searchTerms, setSearchTerms] = useState("")
    return <>
    <TicketSearch setterFunction={setSearchTerms} />
    <TicketList searchTermState={searchTerms} />

    </>

}