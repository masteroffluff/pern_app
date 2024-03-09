const userHelperFunctions = require('../utils/userHelperFunctions')
const bcrypt = require("bcrypt");


module.exports.funcregister = function funcregister(req, res) {
    res.send({
        message: 'This is the mockup controller for funcregister'
    });
}

module.exports.post_register = async function post_register(req, res) {

    const { display_name, email, phone_no, password } = req.body
    const username_taken = await userHelperFunctions.findIfUserNameAlreadTaken(display_name)
    if (username_taken) {
        return res.status(401).send({ message: `Display Name ${display_name} already Taken` })
        
      }
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password,salt)
      const newUser = await userHelperFunctions.add_new_user(display_name, email, password_hash, 'n/a', 'local', phone_no)      

      const newToken = userHelperFunctions.generate_jwt_token(newUser.id)
      console.log(newToken)
      if (!newToken){

        return res.status(400).send({message:'Failed to register'})
      }
      return res.status(201).send({d:newUser, token:newToken})
}

