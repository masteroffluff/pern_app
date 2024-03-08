const isAuthenticated = require('../utils/isAuthenticated')
const userHelperFunctions = require('../utils/userHelperFunctions')

//const jwt = require('jsonwebtoken');
//const util = require('util');
//const jwtSignAsync = util.promisify(jwt.sign);


module.exports.funcuser = function funcuser(req, res) {
  res.send({
    message: 'This is the mockup controller for funcuser'
  });
}

module.exports.get_user =  function get_user(req, res) {
  isAuthenticated(req,res).then(()=>{
    const {id, display_name, email, phone_no} = req.user
    return res.send({id, display_name, email, phone_no})  
  }).catch((e)=> {
    console.log('rejected',e, req.info)
    return res.status(401).send(e)
  })
}

module.exports.update_user = async function update_user(req, res) {
  


  isAuthenticated(req,res).then(()=>{
    const { display_name, email, phone_no} = req.body
    const { id } = req.user
    const username_taken = userHelperFunctions.findIfUserNameAlreadTaken(display_name)
    if (username_taken){
      return res.status(401).send({message:'Display Name already Taken'})
      
    }
    const newDisplay_name = display_name||req.user.display_name
    const newEmail = email||req.user.email
    const newPhone_no = phone_no||req.user.phone_no

  }).catch((e)=> {
    console.log('rejected',e, req.info)
    return res.status(401).send(e)
  })


  return 
}

