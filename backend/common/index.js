const { default: axios } = require("axios");

exports.rendomString = (length = 6) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.isValidMobileNumber = (number) => {
    // Regular expression for validating mobile numbers
    if(number){
        const regex = /^[0-9]{10}$/;
        return regex.test(number);
    }else{
        return "number not found";
    }

}

exports.isValidEmail = (email) => {
    // Regular expression for validating email addresses
    if(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }else{
        return "email not found";
    }

}

exports.formatCustomDate = (date, format) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
  
    return format
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', year)
      .replace('HH', hour)
      .replace('mm', minute)
      .replace('ss', second);
  }

  exports.formatDate = (date, format) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options).replace(',', '');  
  }

  exports.sendMessage = async (message, number) =>{
    const numberSend = number.trim();
    const messageSend = encodeURIComponent(message);
    const smsUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.SMSAPIKEY}&route=q&message=${messageSend}&flash=0&numbers=${numberSend}`;
    const smsResponse = await axios.get(smsUrl)
    console.log('ssssssssssssssssssssssssssssss88888888888888888888888888', smsResponse);
    return smsResponse;
  }