import React from 'react'

function Search({search,searchHandler}) {
  return (
    <div>filter shown with <input type='text' value={search} onChange={(e)=>searchHandler(e)} ></input></div>
  )
}

export default Search