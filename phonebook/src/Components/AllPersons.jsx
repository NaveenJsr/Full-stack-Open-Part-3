import React from 'react'
import ShowPersonDetails from "./ShowPersonDetails"

function AllPersons({persons,deleteContact}) {
  return (
    <div>
        {
            persons.map((person,i)=>{
                return <ShowPersonDetails key={i} deleteContact={deleteContact} id={person.id} name={person.name} number={person.number} />
            })
        }
    </div>
  )
}

export default AllPersons