const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const passSchema = new Schema({
    username :{
        type : String,
        required :true
    },
    hash_pass:{
        type : String,
        required:true
    }
},{timestamps:true})

const Password = mongoose.model('Password',passSchema);
module.exports = Password;

