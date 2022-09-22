const db = require('../models')

// create main model
const Users = db.users

const emailverify = async (req, res) => {
    try{
        email = req.body.email;
        otp = req.body.otp;

        let user = await Users.findOne({
            attributes: ['otp'],
            where: { email: email }
        })

        if(user.otp !== null){
            const savedotp = user.otp
            if(savedotp == otp){ 
                const user = await Users.update({ verified:0 }, { where: {email: email }})
                .then(num => {
                    if (num == 1) {
                        res.json({ message: "Account verified", data:email });
                    } else {
                        res.json({ message: "No user found" });
                    }
                })
                .catch(err => {
                    res.json({ message: "No user found" });
                });

            }else{
                res.json({ message: "OTP mismatch" });
            }
        }else{
            res.json({ message: "No user found" });
        }
       

    }catch (error) {
        console.log(error)
        res.json({message: 'Error completing operation:'});
    }
}


module.exports = {
    emailverify
}