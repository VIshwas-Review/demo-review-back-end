import mongoose from 'mongoose'
const ROLE = Object.freeze({
     ADMINE: 'admine',
     USER: 'user',
     OWNER: 'owner',
   });
const userSchema = mongoose.Schema({
     name:{type: String, required: true,trim: true},
     email:{type: String, required: true,trim: true},
     password:{type: String, required: true,trim: true},
     confirmPassword:{type: String, required: true,trim: true},
     imageUrl:{type: String,  trim:true},
     role:{type:String, default:ROLE.user, enum:ROLE},
     accessToken:{type: String}
},{ timestamps: true})

const User = mongoose.model('User', userSchema)

export default User;