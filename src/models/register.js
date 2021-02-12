const mongoose = require('mongoose');
const membersubcription = new mongoose.Schema({
    subscriptionstartdate:Date,
    subscriptionenddate:Date,
    subscriptionamount:Date
});

const user = new mongoose.Schema({
    name:String,
    role:String,
    salary:Number,
    experiance:Number,
    joindate:Date,
    // membersubcription: [
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'membersubcription' }
    //   ]
});
const Register = new mongoose.model("Register",user);
module.exports = Register;