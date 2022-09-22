// require environment variables
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twiliophone = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

// send sms
function sendSms(phone, otp) {
    client.messages
    .create({
    body: 'Bedrock Trade Login OTP: '+ otp,
    from: twiliophone,
    to: phone
   })
    .then(message => { return true })
    .catch(error => { return false });
}

module.exports = sendSms;