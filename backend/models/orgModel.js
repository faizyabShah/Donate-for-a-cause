   
const mongoose = require('mongoose');

const OrgSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        description:{
            type:String
        },
        phone:{
            type:Number
        },
        location:{
            type:String
        },
        email:{
            type:String
        }
    },{timeStamps:true}
)

const OrgModel = mongoose.model('Organization', OrgSchema);

module.exports = OrgModel;





