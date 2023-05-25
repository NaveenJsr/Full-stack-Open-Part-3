const mongoose = require( "mongoose" )

const phonebookSchema = new mongoose.Schema( {
    name: {
        type: String,
        minLength: 3,
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: ( v ) =>
            {
                return /^\d{2,3}-\d{4,}$/gm.test( v )
            },
            message: props => `${ props.value } is not a valid phone number`
        }
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