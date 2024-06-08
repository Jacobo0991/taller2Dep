const Mongoose = require("mongoose");
const PERSON_CONST = require("../data/person.constants.json")
const Schema = Mongoose.Schema;

const personSchema = new Schema({
    fullname: { 
        type: String,
        required: true,
    },
    dui: {
        type: String,
    },
    birthdate: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        default: PERSON_CONST.EDUCATION.FIRST,
        required: true,
    },
    literate: {
        type: Boolean,
        default: true
    },
    family: {
        type: Schema.Types.ObjectId,
        ref: "Person",
        required: true
    }
}, {timestamps: true})

module.exports = Mongoose.model("Person", personSchema);