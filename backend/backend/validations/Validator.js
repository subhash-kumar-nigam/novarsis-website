const Validator = require('validatorjs')

exports.isEmail =  (email)=>{
    let data = {
        email: email,
      };
      let rules = {
        email: 'required|email',
      };
    let validation = new Validator(data, rules);
    return validation.passes();
}

exports.isModile =  (number)=>{
  let data = {
      mobile: number,
    };
    let rules = {
      mobile: 'required|mobile',
    };
  let validation = new Validator(data, rules);
  return validation.passes();
}