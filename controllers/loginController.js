const db = require('../models')
// require password hashing function
const passwordHash = require('../middlewares/passwordencrypt');
// require mail functions and properties
const { generateotp } = require('../middlewares/mailer');
// require sms function
const smssender = require('../middlewares/smsSender');


// create main model
const Users = db.users

const login = async (req, res) => {
    try{
        password = await passwordHash(req.body.password);
        email = req.body.email;
        const otp = generateotp();

        let user = await Users.findOne({
            attributes: ['id', 'email', 'phone'],
            where: { email: email, password: password  }
        })

        if(user !== null){
            const phone = user.phone
            const sent = smssender(phone, otp);
            if(sent == true){ 
                // give user data as reponse
                res.json({message: "login successful", data:user });
            }else{
                res.json({message: "error sending OTP"});
            }
        }else{
            res.json({message: "No user found"});
        }
       

    }catch (error) {
        console.log(error)
        res.json({message: 'Error completing operation:'});
    }
}


module.exports = {
    login
}