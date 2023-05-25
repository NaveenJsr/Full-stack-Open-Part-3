import React from 'react'

function AddContact({formHandler,newName,setNewName,number,setNumber}) {
  return (
    <form onSubmit={(e)=>formHandler(e)}>
        <div>
          name: <input value={newName} onChange={(e)=>setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={number} onChange={(e)=>setNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default AddContact