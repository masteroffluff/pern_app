//const isAuthenticated = require('../utils/isAuthenticated')
const userHelperFunctions = require('../utils/helperFunctions')

//const jwt = require('jsonwebtoken');
//const util = require('util');
//const jwtSignAsync = util.promisify(jwt.sign);


module.exports.funcuser = function funcuser(req, res) {
  res.send({
    message: 'This is the mockup controller for funcuser'
  });
}

module.exports.get_user = function get_user(req, res) {
  try{
    console.log('getuser')
    const { id, display_name, email, phone_no, birthday, colour } = req.user
    return res.send({ id, display_name, email, phone_no, birthday, colour })
  }catch(e){
    console.log('get_user error', e)
    return res.status(400).send(e)
  }
}

module.exports.update_user = async function update_user(req, res) {
  try {
    const { display_name, email, phone_no, birthday, colour  } = req.body
    console.log("req",req.body)
    const { id } = req.user
    
    const username_taken = display_name!==req.user.display_name&&await userHelperFunctions.findIfUserNameExists(display_name)
    //console.log('username_taken', username_taken)
    if (username_taken) {
      return res.status(401).send({ message: `Display Name ${display_name} already Taken` })
      
    }
    const newDisplay_name = display_name || req.user.display_name
    const newEmail = email || req.user.email
    const newPhone_no = phone_no || req.user.phone_no
    const newBirthday = birthday || req.user.birthday
    const newColour = colour || req.user.colour



    const udatedUser = await userHelperFunctions.updateUserDetails(id, newDisplay_name, newEmail, newPhone_no, newBirthday, newColour )
    return res.send(udatedUser)

  }catch(e){
    console.log('update_user error', e)
    return res.status(400).send(e)
  }


  
}

