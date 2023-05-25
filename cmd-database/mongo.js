const mongoose = require( "mongoose" )
mongoose.set( 'strictQuery', false );

const phonebookSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: String
    }
} )

const phoneBookModel = mongoose.model( 'phonebook', phonebookSchema );

mongoose.connect( `mongodb+srv://naveen:${ process.argv[ 2 ] }@cluster0.hdvyt.mongodb.net/phonebook?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} )
    .then( () =>
    {
        let name = process.argv[ 3 ]
        let number = process.argv[ 4 ]
        if ( name && number )
        {
            phoneBookModel.create( { name, number } ).then( ( data ) =>
            {
                console.log( `added ${ data.name } number ${ data.number } to phonebook` )
                mongoose.connection.close()
            } )
        }
        else if ( process.argv[ 2 ] )
        {
            phoneBookModel.find( {} ).then( ( data ) =>
            {
                console.log( `phonebook:` )
                data.forEach( ( p ) =>
                {
                    console.log( `${ p.name } ${ p.number }` )
                } )
                mongoose.connection.close()
            } )
        }
    } )

