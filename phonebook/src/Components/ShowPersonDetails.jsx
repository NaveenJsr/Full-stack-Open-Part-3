import React from 'react'

function ShowPersonDetails({name,number,id,deleteContact}) {
  return (
    <>
    <span>{name} {number} </span>
    <button onClick={()=>{deleteContact(id)}}>Delete</button>
    <br></br>
    <hr></hr>
    </>
  )
}

export default ShowPersonDetails