const mongoose = require( "mongoose" )

const phonebookSchema = new mongoose.Schema( {
    name: {
        type: String,
    },
    number: {
        type: String
    }
} )

phonebookSchema.set( 'toJSON', {
    transform: ( document, returnedObject ) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
} )

const phoneBookModel = mongoose.model( 'phonebook', phonebookSchema );
module.exports = phoneBookModel