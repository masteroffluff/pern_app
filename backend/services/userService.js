const db = require('../utils/db')
//const passport = require('../utils/passport')
//const jwt = require('jsonwebtoken');
//const util = require('util');
//const jwtSignAsync = util.promisify(jwt.sign);


module.exports.funcuser = function funcuser(req, res) {
  res.send({
    message: 'This is the mockup controller for funcuser'
  });
}

module.exports.get_user = function get_user(req, res) {
  res.send({
    message: 'This is the mockup controller for get_user'
  });
}

module.exports.update_user = function update_user(req, res) {
  res.send({
    message: 'This is the mockup controller for update_user'
  });
}

// helper functions

// function getUserbyId(id) {
//   try {
//     if (!id) {
//       const err = new Error("customer id not defined for getUserbyId")
//       throw (err)
//     }
//     return new Promise((resolve, reject) => {
//       db.query('SELECT * FROM "users" WHERE id=$1', [id], (error, results) => {
//         try {
//           if (error) {
//             console.log("error in getuser");
//             reject(error);
//           } else {
//             resolve({
//               password: results.rows[0].password_hash,
//               ...results.rows[0]
//             });
//           }
//         } catch (error) {
//           console.log("error in getUserbyId 2");
//           console.error(error)
//         }
//       });
//     });
//   } catch (error) {
//     console.log("error in getUserbyId");
//     console.error(error)
//   }
// }

// findById(id, function (err, user) 
async function findById(id, callback) {
  try {
    console.log("id:",id)
    const response = await db.queryPromisified('SELECT * FROM "Users" WHERE id=$1',[id], 'findById')
    const user = response.rows[0]
    user.password = user.password_hash
    callback(null, user)
  } catch (err) {
    console.log("id:",id,"error in findById:",err)
    callback(err, null)
  }
}

async function findByUsername(display_name, callback) {
  try {
    console.log("display_name:",display_name)
    const response =  await db.queryPromisified('SELECT * FROM "Users" WHERE display_name=$1',[display_name], 'findByUsername')
    const user = response.rows[0]
    user.password = user.password_hash
    callback(null, user)
  } catch (err) {
    console.log("error in findByUsername:" + err)
    callback(err, null)
  }
}

module.exports = { ...module.exports, findById, findByUsername }