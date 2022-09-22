const db = require('../models')
// require mail functions and properties
const { generateotp, sendmail } = require('../middlewares/mailer');
// require mailexist file, to check if email address is already registered
const { onlyMailExist } = require('../middlewares/detailsExist');
// require password hashing function
const passwordHash = require('../middlewares/passwordencrypt');
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

const forgotpass = async (req, res) => {
    try{
        email = req.body.email;
        var details = await onlyMailExist(email);

        if(details == true){ 

            var emailSender = {
                body: {
                    name: firstname+' '+lastname,
                    intro: 'We got a request to reset your  password, if this was you, click the link below to reset password or ignore and nothing will happen to your account.',

                    action: {
                        instructions: 'To get started, please click here:',
                        button: {
                            color: '#22BC66',
                            text: 'Recover Password',
                            link: 'https://www.bedrock.trade/passwordreset?email='+email
                        }
                    },
                    
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.\n\n Team Bedrock.'
                }
            };
            
            // Generate an HTML email with the provided contents
            var emailBody = mailGenerator.generate(emailSender);
            // send mail
            const sent = sendmail(email, 'Password Recovery', emailBody);
            if(sent == true){
                res.status(200).json({ message: 'check your mail', data:email })
            }else{
                res.status(200).json({ message: 'error sending mail' })
            }
            
            
        }else{
            res.json({ message: "invalid email address" });
        }

    }catch (error) {
        console.log(error)
        res.json({message: 'Error completing operation:'});
    }
}


const reset = async (req, res) => {
    try{
        email = req.body.email;
        password = passwordHash(req.body.password);

        const user = await Users.update({ password:password }, { where: {email: email }})
        .then(num => {
            if (num == 1) {
                res.json({
                    message: "password changed",
                    data: email
                });
            } else {
                res.json({ message: "error resetting password" });
            }
        })
        .catch(err => {
            res.json({ message: "error resetting user password" });
        });
             

    }catch (error) {
        console.log(error)
        res.json({message: 'Error completing operation:'});
    }
}

module.exports = {
    forgotpass,
    reset
}