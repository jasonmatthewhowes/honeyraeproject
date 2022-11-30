import { Link } from "react-router-dom";

export const Customer = ({id, fullName, address, phoneNumber, email}) => {
    return <section className="customer">
          <div>
            {/* changed the employee email to a react router linkthe link to uses string interpolation to establish the destination*/}
            <Link to={`/customers/${id}`}> Name: {fullName} </Link>
          </div>
          <div>Address: {address}</div>
          <div>Phone Number: {phoneNumber}</div>
          <div>Email: {email}</div>
        </section>
    }