const bcrypt = require("bcrypt");

bcrypt.genSalt(10).then((salt)=>bcrypt.hash("passw0rd",salt)).then((hashedPassword)=>{console.log(hashedPassword)})

