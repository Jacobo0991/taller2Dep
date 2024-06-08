const Mongoose = require("mongoose");
const FAMILY_CONST = require("../data/family.constants.json");
const PersonModel = require("./Person.model");
const Schema = Mongoose.Schema;

const familySchema = new Schema({
    local_id: {
        type: Mongoose.Schema.ObjectId,
        required: true,
        unique: true
    },
    community: { 
        type: String,
        required: true,
    },
    house_type: {
        type: String,
        default: FAMILY_CONST.HOUSE_TYPE.CEMENTO,
        required: true,
    },
    risk: {
        type: String,
        default: FAMILY_CONST.RISK.MID,
        required: true
    },
    latitude:{
        type: Number,
        default: 0,
        required: true
    }, 
    longitude:{
        type: Number,
        default: 0,
        required: true
    },
    people: {
        type: [{
            type: Mongoose.Schema.ObjectId,
            ref: 'Person'
        }],
        default: []
    }
}, {timestamps: true})

module.exports = Mongoose.model("Family", familySchema);