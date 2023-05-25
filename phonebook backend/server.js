const express = require( "express" );
const morgan = require( "morgan" );
const cors = require( "cors" );
require( "dotenv" ).config();
const app = express();
const mongoose = require( "mongoose" );
mongoose.set( "strictQuery", false );
// eslint-disable-next-line no-undef
mongoose.connect( process.env.MONGO_URI, () =>
{
    console.log( "db is connected" );
} );

const phoneBookModel = require( "./model" );

//Middleware
app.use( cors() );
app.use( express.json() );
// eslint-disable-next-line no-unused-vars
morgan.token( "payload", ( req, res ) =>
    req.method === "POST" ? JSON.stringify( req.body ) : null
);
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :payload"
    )
);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen( PORT, () =>
{
    console.log( `Server is started on port ${ PORT }` );
} );

app.get( "/api/persons", async ( req, res ) =>
{
    let allPhoneData = await phoneBookModel.find( {} );
    res.send( allPhoneData );
} );

app.get( "/api/info", ( req, res ) =>
{
    phoneBookModel.countDocuments( {} ).then( ( count ) =>
    {
        let currentTime = new Date();
        res.send(
            `<p>Phonebook has info for ${ count } people </p> <p> ${ currentTime } </p>`
        );
    } );
} );

app.get( "/api/persons/:id", ( req, res, next ) =>
{
    let id = req.params.id;

    phoneBookModel
        .findOne( { _id: id } )
        .then( ( data ) =>
        {
            if ( data )
            {
                return res.send( data );
            } else
            {
                return res.status( 404 ).end();
            }
        } )
        .catch( ( error ) =>
        {
            next( error );
        } );
} );

app.put( "/api/persons/:id", ( req, res, next ) =>
{
    let id = req.params.id;
    let payload = req.body;
    phoneBookModel
        .findOneAndUpdate( { _id: id }, payload, {
            new: true,
            runValidators: true,
            context: "query",
        } )
        .then( ( data ) =>
        {
            console.log( data );
            res.send( data );
        } )
        .catch( ( error ) =>
        {
            next( error );
        } );
} );

app.delete( "/api/persons/:id", ( req, res, next ) =>
{
    let id = req.params.id;

    phoneBookModel
        .findOneAndDelete( { _id: id } )
        .then( () =>
        {
            res.status( 204 ).send( "Deleted Successfully" );
        } )
        .catch( ( error ) =>
        {
            next( error );
        } );
} );

app.post( "/api/persons", ( req, res, next ) =>
{
    const person = req.body;

    if ( !req.body.name || !req.body.number )
    {
        return res.status( 400 ).send( { error: "Invalid Input" } );
    }

    phoneBookModel
        .create( person )
        .then( ( newPerson ) =>
        {
            res.send( newPerson );
        } )
        .catch( ( error ) =>
        {
            next( error );
        } );
} );

//Error handling Middleware
const errorHandler = ( error, req, res, next ) =>
{
    console.log( error.name );
    if ( error.name === "CastError" )
    {
        return res.status( 400 ).send( { error: "malformatted id" } );
    } else if ( error.name === "ValidationError" )
    {
        return res.status( 400 ).send( { error: error.message } );
    }
    next( error );
};

app.use( errorHandler );
