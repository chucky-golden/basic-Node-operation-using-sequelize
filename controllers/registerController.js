const db = require('../models')
// require password hashing function
const passwordHash = require('../middlewares/passwordencrypt');
// require mail functions and properties
const { generateotp, sendmail } = require('../middlewares/mailer');
// require mailexist file, to check if email address is already registered
const { detailExists } = require('../middlewares/detailsExist');
// import mailgen
const Mailgen = require('mailgen');

// Configure mailgen by setting a theme and your product info
var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'Infinanze',
        link: 'https://www.bedrock.com/'
    }
});



// create main model
const Users = db.users

const register = async (req, res) => {
    try{
        password = await passwordHash(req.body.password);
        email = req.body.email;
        phone = req.body.phone;
        firstname = req.body.firstname;
        lastname = req.body.lastname;
        const otp = generateotp();
        var details = await detailExists(email, phone);

        if(details == false){ 
            // create an objet from the request coming in
            let info = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                phone: req.body.phone,
                gender: req.body.gender,
                country: req.body.country,
                role: req.body.role,
                otp: otp,
            }

            // save to database
            const users = await Users.create(info)
            if(users === null){ 
                res.status(200).json({message: 'error registering user'})
            }else{
                var emailSender = {
                    body: {
                        name: firstname+' '+lastname,
                        intro: 'You are getting this mail because of a successful account registration on our website, please enter the OTP below to complete account registration. \n\n'+otp,
                        
                        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.\n\n Team Bedrock.'
                    }
                };
                
                // Generate an HTML email with the provided contents
                var emailBody = mailGenerator.generate(emailSender);
                // send mail
                const sent = sendmail(email, 'Email Verification', emailBody);
                if(sent == true){
                    res.status(200).json({message: 'registration sucessful, check your mail', data: users})
                }else{
                    res.status(200).json({message: 'error sending otp'})
                }
            }
            
        }else{
            res.json({message: "user with email address or phone number already exists"});
        }

    }catch (error) {
        console.log(error)
        res.json({message: 'Error completing operation:'});
    }
}


module.exports = {
    register
}