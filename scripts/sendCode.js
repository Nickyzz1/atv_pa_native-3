const TelesignSDK = require('telesignenterprisesdk');
  
const customerId = process.env.CUSTOMER_ID || "6AE5AF8A-388C-425A-AB2B-4883FE4DFC23";
const apiKey = process.env.API_KEY || '33RoqF3BUWRmC2961X16VTNmT420baQqBpmrHlxkbeomJsz2AXAcQTIFXEPpaN4TRi3E97MJhlBtCX8emu4HAg==';
const phoneNumber = process.env.PHONE_NUMBER || "5541995050132";
const verifyCode = Math.floor(Math.random() * 99999).toString();
const params = {
  verify_code: verifyCode
  , sender_id: "undefined"
};

const client = new TelesignSDK(customerId, apiKey);

function smsVerifyCallback(error, responseBody) {
  if (error === null) {
    console.log("\nResponse body:\n" + JSON.stringify(responseBody));
  } else {
    console.error("Unable to send message. " + error);
  }
  prompt('\nEnter the verification code you received:\n', verify);
}

function prompt(question, callback) {
  const stdin = process.stdin, stdout = process.stdout;
  stdin.resume();
  stdout.write(question);
  stdin.once('data', function (data) {
    callback(data.toString().trim());
  });
}

function verify(input) {
  if (input === params['verify_code']) {
    console.log('\nYour code is correct.');
  } else {
    console.log('\nYour code is incorrect.');
  }
  process.exit();
}

client.verify.sms(smsVerifyCallback, phoneNumber, params);
