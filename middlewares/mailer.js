const nodemailer = require('nodemailer');

// email configuration 
const transporter = nodemailer.createTransport({
    host: 'mail.cryptonfttrademining.com',
    port: 465,
    auth: {
      user: 'testemail@cryptonfttrademining.com',
      pass: 'Nodetest2022'
    }
});


// mail request
function sendmail(to, subject, message){
    const mailOptions = {
        from: 'testemail@cryptonfttrademining.com',
        to: to,
        subject: subject,
        html: message
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        return false
    } else {
        return true
    }
    });

}


// generate otp
function generateotp() {
	num = ""
	for(let i = 0; i < 6; i++){ 
    	num += Math.floor(Math.random() * (9 - 0 + 1)) + 0;
	}
	return num;
}


module.exports = {
    generateotp,
    sendmail
};