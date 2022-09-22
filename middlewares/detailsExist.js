const db = require('../models')
const { Op } = require("sequelize")

// create main model
const Users = db.users


async function detailExists (email, phone){
    let user = await Users.findOne({
        attributes: ['email', 'phone'],
        where: {
            [Op.or]: [
              { email: email },
              { phone: phone }
            ]
          }
        })
    if(user === null){
        return false
    }else{
        return true
    }
}

async function onlyMailExist (email){
    let user = await Users.findOne({
            attributes: ['email'],
            where: { email: email }
        })
    if(user === null){
        return false
    }else{
        return true
    }
}


module.exports = {
    detailExists,
    onlyMailExist
};