const express = require( 'express' )
const morgan = require( 'morgan' )
const app = express()

//Middleware
app.use( express.json() )
morgan.token( 'payload', ( req, res ) => req.method === 'POST' ? JSON.stringify( req.body ) : null )
app.use( morgan( ':method :url :status :res[content-length] - :response-time ms :payload' ) )


let data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const PORT = 3001
app.listen( PORT, () =>
{
    console.log( `Server is started on port ${ PORT }` )
} )


app.get( "/api/persons", ( req, res ) =>
{
    res.send( data )
} )

app.get( "/api/info", ( req, res ) =>
{
    let count = data.length
    let currentTime = new Date()

    res.send( `<p>Phonebook has info for ${ count } people </p> <p> ${ currentTime } </p>` )
} )

app.get( "/api/persons/:id", ( req, res ) =>
{
    let id = Number( req.params.id )

    let person = data.find( ( p ) => p.id === id )

    // console.log(person)

    if ( person )
    {
        return res.send( person )
    }

    res.status( 404 ).send( `Data not found` )

} )

app.delete( "/api/persons/:id", ( req, res ) =>
{
    let id = Number( req.params.id )

    let filteredData = data.filter( ( p ) => p.id !== id )
    console.log( filteredData )

    res.status( 204 ).send( 'Deleted Successfully' )

} )

app.post( "/api/persons", ( req, res ) =>
{
    const person = req.body

    if ( !req.body.name || !req.body.number )
    {
        return res.status( 400 ).send( { error: "Invalid Input" } )
    }
    let found = false
    data.forEach( ( p ) =>
    {
        if ( p.name === req.body.name )
        {
            found = true
        }
    } )

    if ( found )
    {
        return res.status( 400 ).send( { error: "name must be unique" } )
    }

    person.id = Math.floor( Math.random() * 1000000 )

    data = data.concat( person )

    res.send( data )

} )