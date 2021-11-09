import mongoose from 'mongoose'
import Schema from 'mongoose'

const airlineSchema = mongoose.Schema({
     title: String,
     image_url: String,
     owner: String,
     reviews:[{
          type: Schema.Types.ObjectId,
          ref: 'Review'
     }],
    
},{ timestamps: true})

const  Airline = mongoose.model('Airline', airlineSchema)

export default Airline;