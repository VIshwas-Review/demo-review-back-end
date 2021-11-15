import mongoose from 'mongoose'
import Schema from 'mongoose'

const airlineSchema = mongoose.Schema({
     title: String,
     imageUrl: String,
     owner: String,
     reviews:[{
          type: Schema.Types.ObjectId,
          ref: 'Review'
     }],
     like:{type: Number,default:0}
    
},{ timestamps: true})

const  Airline = mongoose.model('Airline', airlineSchema)

export default Airline;