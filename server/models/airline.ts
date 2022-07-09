import mongoose from 'mongoose'
import Schema from 'mongoose'

const airlineSchema = new mongoose.Schema(
  {
    title: String,
    imageUrl: String,
    owner: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    likes: { type: [String], default: [] },
  },
  { timestamps: true }
)

const Airline = mongoose.model('Airline', airlineSchema)

export default Airline
