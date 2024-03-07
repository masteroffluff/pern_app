const db = require('../utils/db')
const passport = require('../utils/passport')
//const jwt = require('jsonwebtoken');
const util = require('util');
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

function getUserbyId(id) {
    try {
      if (!id){
        const err = new Error("customer id not defined for getUserbyId")
        throw(err)
      }
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM customers WHERE customer_id=$1', [id], (error, results) => {
          try {
            if (error) {
              console.log("error in getuser");
              reject(error);
            } else {
              resolve({
                password:results.rows[0].password_hash,
                ...results.rows[0]
              });
            }
          } catch (error) {
            console.log("error in getUserbyId 2");
            console.error(error)
          }
        });
      });
    } catch (error) {
      console.log("error in getUserbyId");
      console.error(error)
    }
  }

  module.exports={...module.exports,getUserbyId}