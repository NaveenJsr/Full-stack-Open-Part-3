import React from 'react'

function Notification({type,message}) {
  return (
    <div className={`notify ${type}` }>
        {message}
    </div>
  )
}

export default Notification