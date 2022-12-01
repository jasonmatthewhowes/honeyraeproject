import { Link } from "react-router-dom"

export const Employee = ({id, fullName, email}) => {
return <section className="employee">
      <div>
        {/* changed the employee email to a react router linkthe link to uses string interpolation to establish the destination*/}
        <Link to={`/employees/${id}`}> Name: {fullName} </Link>
      </div>
      <div>Email: {email}</div>
    </section>
}