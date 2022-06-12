import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
     title: String,
     description: String,
     
},
{timestamps: true})

const Review = mongoose.model('Review', reviewSchema)

export default Review