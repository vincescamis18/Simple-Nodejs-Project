const mongoose = require('mongoose');
const membersubcription = new mongoose.Schema({
    subscriptionstartdate:Date,
    subscriptionenddate:Date,
    subscriptionamount:Date
})
const membersubcription = new mongoose.model("Membersubcription",membersubcription);
module.exports = membersubcription;