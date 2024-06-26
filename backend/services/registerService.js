const helperFunctions = require('../utils/helperFunctions')
const bcrypt = require("bcrypt");


module.exports.funcregister = function funcregister(req, res) {
    res.send({
        message: 'This is the mockup controller for funcregister'
    });
}

module.exports.post_register = async function post_register(req, res) {
  const { display_name, email, phone_no, password, birthday} = req.body
  try {
      const username_taken = await helperFunctions.findIfUserNameExists(display_name)
      if (username_taken) {
          return res.status(401).send({ message: `Display Name ${display_name} already Taken` })
          
        }
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password,salt)
        const newUser = await helperFunctions.add_new_user(display_name, email, password_hash, 'n/a', 'local', phone_no, birthday||null)      
  
        const newToken = helperFunctions.generate_jwt_token(newUser.id)
        await helperFunctions.insertDefaultImage(newUser.id)
        console.log(newToken)
        if (!newToken){
  
          return res.status(400).send({message:'Failed to register'})
        }
        return res.status(201).send({id:newUser, token:newToken})
  } catch (error) {
    console.log(display_name, email, phone_no, password, birthday)
    console.log(error.message)
    return res.status(401).send({ message: error.message })
  }
}

