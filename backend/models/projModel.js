//project schema here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrgModel = require('./orgModel');

const ProjSchema = new Schema(
    {
    name:{
        type: String,
        },
    description:{

        type:String
    },
    cost:{
        type:Number
    },
    donations:{
        type:[[Number]]
    },
    amount_raised:{
        type:Number},
    Type:{
        type:String,
        enum:[
            'Zakat','Zakat-ul-Fitr','Sadaqah','Sadaqah Jariyah', 
            'Qurbani','Waqf'
        ]},
    Audit:{
        type:String
    },
Picture:{
    type:String
},
organization: {
    type: Schema.Types.ObjectId,
    ref: OrgModel
  }
},{timeStamps:true});

const ProjModel = mongoose.model('Project', ProjSchema);
module.exports = {ProjModel};