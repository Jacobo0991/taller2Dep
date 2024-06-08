const Family = require("../models/Family.model")
const Person = require("../models/Person.model")

const controller = {}

controller.getAll = async(req, res, next) => {
    try {
        let data = await Family.find()
        await Promise.all(data.map(async (family, index) => {
            let people  = await Person.find({family: family._id})
            data[index].people = people
            
        }))
        console.log(data)
        return res.status(200).json({data})
    } catch (error) {
        next(error)
    }
}

controller.savePerson = async(req, res, person, id) => {
    try{
        console.log(id)
        const { fullname, dui, birthdate, education, literate } = person
        let newPerson = new Person()
        newPerson.fullname = fullname
        newPerson.dui = dui
        newPerson.birthdate = birthdate
        newPerson.education = education
        newPerson.literate = literate
        newPerson.family = id

        const savedPerson = await newPerson.save({ setDefaultsOnInsert: true })

        return
        
    } catch (error) {
        console.log(error)
    }
}

controller.saveFamily = async(req, res, family) => {
    try{

        const {local_id, community, house_type, risk, people , latitude, longitude} = family
        
        
        
        let _family = new Family()
        _family.local_id = local_id
        _family.community = community
        _family.house_type = house_type
        _family.risk = risk
        _family.latitude = latitude
        _family.longitude = longitude
        
        const savedFamily = await _family.save({ setDefaultsOnInsert: true })
        await Promise.all(people.map(async (file) => {
            await controller.savePerson(req, res, file, savedFamily._id)
        }))
        return
    } catch (error) {
        console.log(error)
    }
}

controller.saveFamilies = async(req, res, next) => {

    try {
        const families = req.body
        await Promise.all(families.map(async (family) => {
            await controller.saveFamily(req, res, family)
        }))
        return res.status(200).json({result: "Datos guardados"})
    } catch (error) {
        next()
    }
}

module.exports = controller