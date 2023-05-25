import axios from "axios";
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () =>
{
    const request = axios.get( baseUrl )
    return request.then( response => response.data )
}


const savePhone = ( contact ) =>
{
    const request = axios.post( baseUrl, contact )
    return request.then( response => response.data )
}

const deletePhone = ( id ) =>
{
    const request = axios.delete( `${ baseUrl }/${ id }` )
    return request
}

const updatePhone = ( contact ) =>
{
    const request = axios.put( `${ baseUrl }/${ contact.id }`, contact )
    return request.then( response => response.data )
}

const ApiService = {
    getAll,
    savePhone,
    deletePhone,
    updatePhone
}

export default ApiService